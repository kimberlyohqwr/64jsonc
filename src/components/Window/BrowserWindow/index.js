import React, { useEffect, useState } from 'react';
import './stylesheet.scss';
import { classes, getSubKeys } from 'common/utils';
import Window from 'components/Window';
import { projects } from '../DirectoryWindow/data';
import Icon from 'components/Icon';
import Link from 'components/Link';
import { useHistory } from 'react-router-dom';

function BrowserWindow({ windowProps, onUpdate, ...restProps }) {
  const { windowKey, path } = windowProps;
  const subKeys = getSubKeys(path);
  const [projectKey] = subKeys;
  const history = useHistory();

  const [tabKeys, setTabKeys] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const project = projects.find(project => project.key === projectKey);
  const src = project && project.link || '';

  useEffect(() => {
    if (projectKey) {
      if (!tabKeys.includes(projectKey)) {
        const newTabKeys = [...tabKeys, projectKey];
        setTabKeys(newTabKeys);
      }
      setActiveKey(projectKey);
    }
  }, [projectKey]);

  return (
    <Window className="BrowserWindow" windowKey={windowKey}
            tabs={tabKeys.map((tabKey, i) => {
              const project = projectKey && projects.find(project => project.key === tabKey);
              return (
                <Link className={classes('tab', activeKey === tabKey && 'active')} key={tabKey}
                      path={`/${windowKey}/${tabKey}`}>
                  <Icon className="icon" imageUrl={project.image}/>
                  <div className="name">{project.name}</div>
                  <div className="close" onClick={() => {
                    const newTabKeys = tabKeys.filter(key => key !== tabKey);
                    setTabKeys(newTabKeys);
                    if (newTabKeys.length === 0) {
                      history.push('/');
                      onUpdate({
                        opened: false,
                        path: `/${windowKey}`,
                      });
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
