import React, { useContext, useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes, getUrlKeys } from 'common/utils';
import { Icon, Link, Window } from 'components';
import { useHistory } from 'react-router-dom';
import { FileSystemContext } from 'contexts';

function BrowserWindow(props) {
  const { app, onUpdate } = props;
  const [, activeTabKey] = getUrlKeys(app.url);
  const history = useHistory();

  const [rootDir] = useContext(FileSystemContext);
  const desktopDir = rootDir.getDesktopDir();

  const [tabs, setTabs] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const getTab = tabKey => {
    const existingTab = tabs.find(tab => tab.key === tabKey);
    if (existingTab) {
      return existingTab;
    }
    const match = /^history-v(\d+)$/.exec(tabKey);
    if (match) {
      const version = match[1];
      return {
        key: tabKey,
        link: `/version_history/v${version}`,
        name: `Version ${version}`,
        iconProps: {
          iconKey: 'version_history',
        },
      };
    }

    const projectsDir = desktopDir && desktopDir.getChild('projects');
    const projects = projectsDir ? projectsDir.children : [];
    const project = projects.find(project => project.key === tabKey);
    if (project) {
      const { key, name, iconProps, content } = project;
      const match = /^\[(.+)]\(.+\)$/.exec(content.link);
      return {
        key,
        link: match ? match[1] : content.link,
        name,
        iconProps,
      };
    }

    return undefined;
  };

  const activeTab = getTab(activeTabKey);

  useEffect(() => {
    if (activeTab && !tabs.includes(activeTab)) {
      const newTabs = [...tabs, activeTab];
      setTabs(newTabs);
    }
  }, [activeTab]);

  const link = activeTab && activeTab.link;

  return (
    <Window className="BrowserWindow"
            tabs={tabs.map((tab, i) => (
              <Link className={classes('tab', tab === activeTab && 'active')} key={tab.key}
                    url={`/${app.key}/${tab.key}`}>
                <Icon className="icon" {...tab.iconProps}/>
                <div className="name">{tab.name}</div>
                <div className="close" onClick={e => {
                  e.preventDefault();
                  const newTabs = tabs.filter(t => t !== tab);
                  setTabs(newTabs);
                  if (newTabs.length === 0) {
                    history.push('/');
                    onUpdate({ closing: true });
                  } else if (tab === activeTab) {
                    const newActiveTab = newTabs[Math.min(newTabs.length - 1, i)];
                    history.push(`/${app.key}/${newActiveTab.key}`);
                  }
                }}/>
              </Link>
            ))}
            defaultWidth={60 * 16} defaultHeight={40 * 16}
            {...props}>
      <div className="addressbar">
        <div className={classes('button', 'button-refresh')} onClick={() => setRefresh(refresh + 1)}/>
        <div className="url">{link}</div>
        <Link className={classes('button', 'button-new')} url={link}/>
      </div>
      <iframe key={refresh} className="iframe" src={link} title={activeTab && activeTab.name}/>
    </Window>
  );
}

export default BrowserWindow;
