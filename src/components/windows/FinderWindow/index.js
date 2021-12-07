import React, { useContext, useEffect, useRef } from 'react';
import './stylesheet.scss';
import { classes, getPathKeys, namize } from 'common/utils';
import { Icon, Link, Window } from 'components';
import { useHistory } from 'react-router-dom';
import { FileSystemContext } from 'contexts';
import { File } from 'data/rootDir';
import ReactMarkdown from 'react-markdown';

function FinderWindow({ windowProps, ...restProps }) {
  const { windowKey, path } = windowProps;

  const [rootDir] = useContext(FileSystemContext);

  const { desktop } = rootDir.users.jason;

  const history = useHistory();
  const pathKeys = [];
  const activeDirectories = [desktop];
  getPathKeys(path).some(pathKey => {
    const parentDirectory = activeDirectories[activeDirectories.length - 1];
    const directory = parentDirectory.getChild(pathKey);
    if (!directory) {
      return true;
    }
    pathKeys.push(pathKey);
    activeDirectories.push(directory);
  });
  const activeDirectory = activeDirectories[activeDirectories.length - 1];

  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [path]);

  return (
    <Window className="FinderWindow" windowKey={windowKey}
            title={activeDirectory && activeDirectory.name}
            iconProps={activeDirectory && activeDirectory.iconProps}
            onKeyDown={e => {
              e.preventDefault();
              switch (e.keyCode) {
                case 37: {
                  if (pathKeys.length > 0) {
                    history.push(`/${pathKeys.slice(0, -1).join('/') || windowKey}`);
                  }
                  break;
                }
                case 39: {
                  const childrenKeys = activeDirectory.getChildrenKeys();
                  if (childrenKeys.length > 0) {
                    history.push(`/${[...pathKeys, childrenKeys[0]].join('/')}`);
                  }
                  break;
                }
                case 38: {
                  const parentDirectory = activeDirectories[activeDirectories.length - 2];
                  if (parentDirectory) {
                    const siblingKeys = parentDirectory.getChildrenKeys();
                    const index = siblingKeys.indexOf(activeDirectory.key) - 1;
                    if (index >= 0) {
                      history.push(`/${[...pathKeys.slice(0, -1), siblingKeys[index]].join('/')}`);
                    }
                  }
                  break;
                }
                case 40: {
                  const parentDirectory = activeDirectories[activeDirectories.length - 2];
                  if (parentDirectory) {
                    const siblingKeys = parentDirectory.getChildrenKeys();
                    const index = siblingKeys.indexOf(activeDirectory.key) + 1;
                    if (index < siblingKeys.length) {
                      history.push(`/${[...pathKeys.slice(0, -1), siblingKeys[index]].join('/')}`);
                    }
                  }
                  break;
                }
              }
            }}
            windowProps={windowProps}
            {...restProps}>
      {
        activeDirectories.map((activeDirectory, i) => activeDirectory instanceof File ? (
          <div className={classes('panel', 'panel-preview')} key={activeDirectory.key}>
            <div className="preview">
              <img className="image" src={activeDirectory.content.image}/>
              <div className="property-container">
                {
                  Object.keys(activeDirectory.content).map(propertyKey => {
                    if (propertyKey === 'image') return;
                    const value = activeDirectory.content[propertyKey];
                    return (
                      <div key={propertyKey} className="property">
                        <div className="key">{namize(propertyKey)}</div>
                        <div className="value">
                          <ReactMarkdown source={value} escapeHtml={false}
                                         renderers={{
                                           link: ({ href, children }) => (
                                             <Link {...(href.startsWith('/') ? { path: href } : { href })}>
                                               {children}
                                             </Link>
                                           ),
                                         }}/>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              <Link className="close" path={`/${[...pathKeys.slice(0, i)].join('/')}`}/>
            </div>
          </div>
        ) : (
          <div className={classes('panel', 'panel-list')} key={activeDirectory.key}>
            <div className="list">
              <Link className={classes('directory', 'directory-parent')} path={`/${windowKey}`}>
                <Icon className="icon" iconKey="finder"/>
                <div className="name">..</div>
              </Link>
              {
                activeDirectory.getChildrenKeys().map(childKey => {
                  const directory = activeDirectory.getChild(childKey);
                  const isActive = childKey === pathKeys[i];
                  return (
                    <Link key={childKey} className={classes('directory', isActive && 'active')}
                          path={`/${[...pathKeys.slice(0, i), childKey].join('/')}`}
                          ref={isActive ? focusRef : undefined}>
                      <Icon className="icon" {...directory.iconProps}/>
                      <div className="name">{directory.name}</div>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        ))
      }
    </Window>
  );
}

export default FinderWindow;
