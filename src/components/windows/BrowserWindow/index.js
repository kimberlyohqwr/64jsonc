import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes, getUrlKeys } from 'common/utils';
import { Icon, Link, Window } from 'components';
import projects from 'data/projects';
import { useHistory } from 'react-router-dom';

function BrowserWindow({ app, onUpdate, ...restProps }) {
  const { key: appKey, url } = app;
  const [, projectKey] = getUrlKeys(url);
  const history = useHistory();

  const [tabKeys, setTabKeys] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const project = projects.find(project => project.key === projectKey);

  const getLink = project => {
    if (!project) return null;
    const match = /^\[(.+)]\(.+\)$/.exec(project.link);
    if (match) return match[1];
    return project.link;
  };

  const src = getLink(project);

  useEffect(() => {
    if (projectKey) {
      if (tabKeys.includes(projectKey)) {
        setActiveKey(projectKey);
      } else {
        const project = projects.find(project => project.key === projectKey);
        if (project) {
          const newTabKeys = [...tabKeys, projectKey];
          setTabKeys(newTabKeys);
          setActiveKey(projectKey);
        }
      }
    }
  }, [projectKey]);

  return (
    <Window className="BrowserWindow"
            tabs={tabKeys.map((tabKey, i) => {
              const project = projects.find(project => project.key === tabKey);
              return (
                <Link className={classes('tab', activeKey === tabKey && 'active')} key={tabKey}
                      url={`/${appKey}/${tabKey}`}>
                  <Icon className="icon" imageUrl={project.image}/>
                  <div className="name">{project.name}</div>
                  <div className="close" onClick={e => {
                    e.preventDefault();
                    const newTabKeys = tabKeys.filter(key => key !== tabKey);
                    setTabKeys(newTabKeys);
                    if (newTabKeys.length === 0) {
                      history.push('/');
                      onUpdate({ opened: false });
                    } else if (activeKey === tabKey) {
                      const newActiveKey = newTabKeys[Math.min(newTabKeys.length - 1, i)];
                      history.push(`/${appKey}/${newActiveKey}`);
                    }
                  }}/>
                </Link>
              );
            })}
            defaultWidth={60 * 16} defaultHeight={40 * 16}
            app={app} onUpdate={onUpdate} {...restProps}>
      <div className="addressbar">
        <div className={classes('button', 'button-refresh')} onClick={() => setRefresh(refresh + 1)}/>
        <div className="url">{src}</div>
        <Link className={classes('button', 'button-new')} url={src}/>
      </div>
      <iframe key={refresh} className="iframe" src={src}/>
    </Window>
  );
}

export default BrowserWindow;
