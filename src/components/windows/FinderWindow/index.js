import React, { useContext, useEffect, useRef } from 'react';
import './stylesheet.scss';
import { classes, getUrlKeys, namize } from 'common/utils';
import { Icon, Link, Window } from 'components';
import { useHistory } from 'react-router-dom';
import { FileSystemContext } from 'contexts';
import { Dir, PreviewFile } from 'beans';
import ReactMarkdown from 'react-markdown';

function FinderWindow({ app, ...restProps }) {
  const { key: appKey, url } = app;

  const [rootDir] = useContext(FileSystemContext);

  const history = useHistory();

  const pathKeys = getUrlKeys(url);
  if (pathKeys[0] === appKey) {
    pathKeys.shift();
  } else {
    pathKeys.unshift('users', 'jason', 'desktop');
  }
  let parentDir = rootDir;
  const activeChildren = pathKeys.map(dirKey => {
    parentDir = parentDir && parentDir.getChild(dirKey);
    return parentDir;
  }).filter(v => v);
  activeChildren.unshift(rootDir);
  const activeChild = activeChildren[activeChildren.length - 1];
  const activeFinderChild = (activeChild instanceof Dir || activeChild instanceof PreviewFile) ? activeChild : activeChild.parent;

  const dirRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (dirRef.current) {
      dirRef.current.scrollIntoView({ block: 'nearest' });
    }
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ inline: 'end' });
    }
  }, [url]);

  return (
    <Window className="FinderWindow"
            title={activeFinderChild.name}
            iconProps={activeFinderChild.iconProps}
            defaultWidth={50 * 16} defaultHeight={30 * 16}
            onKeyDown={e => {
              e.preventDefault();
              switch (e.keyCode) {
                case 13: {
                  if (activeChild.url !== activeChild.finderUrl) {
                    activeChild.open(history);
                  }
                  break;
                }
                case 37: {
                  const { parent } = activeChild;
                  if (parent) {
                    history.push(parent.finderUrl);
                  }
                  break;
                }
                case 39: {
                  if (activeChild instanceof Dir) {
                    const [child] = activeChild.children;
                    if (child) {
                      history.push(child.finderUrl);
                    }
                  }
                  break;
                }
                case 38: {
                  const parentDir = activeChild.parent;
                  if (parentDir) {
                    const siblings = parentDir.children;
                    const sibling = siblings[siblings.indexOf(activeChild) - 1];
                    if (sibling) {
                      history.push(sibling.finderUrl);
                    }
                  }
                  break;
                }
                case 40: {
                  const parentDir = activeChild.parent;
                  if (parentDir) {
                    const siblings = parentDir.children;
                    const sibling = siblings[siblings.indexOf(activeChild) + 1];
                    if (sibling) {
                      history.push(sibling.finderUrl);
                    }
                  }
                  break;
                }
              }
            }}
            app={app}
            {...restProps}>
      {
        activeChildren.map((child, i) => child instanceof Dir ? (
          <div className={classes('panel', 'panel-list')} key={child.path} ref={panelRef}>
            <div className="list">
              {
                child.parent && (
                  <Link className={classes('dir', 'dir-parent')} url={child.parent.url}>
                    <Icon className="icon" iconKey="finder"/>
                    <div className="name">..</div>
                  </Link>
                )
              }
              {
                child.children.map(child => {
                  const isActive = child === activeChildren[i + 1];
                  return (
                    <Link key={child.key} className={classes('dir', isActive && 'active')}
                          url={child.url} ref={isActive ? dirRef : undefined}>
                      <Icon className="icon" {...child.iconProps}/>
                      <div className="name">{child.name}</div>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        ) : child instanceof PreviewFile ? (
          <div className={classes('panel', 'panel-preview')} key={child.path} ref={panelRef}>
            <div className="preview">
              <img className="image" src={child.content.image}/>
              <div className="property-container">
                {
                  Object.keys(child.content).map(propertyKey => {
                    if (propertyKey === 'image') return;
                    const value = child.content[propertyKey];
                    return (
                      <div key={propertyKey} className="property">
                        <div className="key">{namize(propertyKey)}</div>
                        <div className="value">
                          <ReactMarkdown source={value} escapeHtml={false}
                                         renderers={{
                                           link: ({ href, children }) => (
                                             <Link url={href}>
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
              <Link className="close" url={child.parent.url}/>
            </div>
          </div>
        ) : null)
      }
    </Window>
  );
}

export default FinderWindow;
