import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes, getPathKeys } from 'common/utils';
import { Icon, Link, Window } from 'components';
import projects from 'data/projects';
import { useHistory } from 'react-router-dom';

function BrowserWindow({ windowProps, onUpdate, ...restProps }) {
  const { windowKey, path } = windowProps;
  const [, projectKey] = getPathKeys(path);
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
    <Window className="BrowserWindow" windowKey={windowKey}
            tabs={tabKeys.map((tabKey, i) => {
              const project = projects.find(project => project.key === tabKey);
              return (
                <Link className={classes('tab', activeKey === tabKey && 'active')} key={tabKey}
                      path={`/${windowKey}/${tabKey}`}>
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
                      history.push(`/${windowKey}/${newActiveKey}`);
                    }
                  }}/>
                </Link>
              );
            })}
            windowProps={windowProps} onUpdate={onUpdate} {...restProps}>
      <div className="addressbar">
        <div className={classes('button', 'button-refresh')} onClick={() => setRefresh(refresh + 1)}/>
        <div className="url">{src}</div>
        <Link className={classes('button', 'button-new')} href={src}/>
      </div>
      <iframe key={refresh} className="iframe" src={src}/>
    </Window>
  );
}

export default BrowserWindow;
