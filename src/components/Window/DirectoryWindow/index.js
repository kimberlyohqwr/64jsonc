import React from 'react';
import './stylesheet.scss';
import { classes, getSubKeys, name } from 'common/utils';
import Window from 'components/Window';
import Link from 'components/Link';
import Icon from 'components/Icon';
import { useHistory } from 'react-router-dom';
import * as directoryMap from './data';

const directoryKeys = Object.keys(directoryMap);

function DirectoryWindow({ windowProps, ...restProps }) {
  const { windowKey, path } = windowProps;

  const history = useHistory();
  const subKeys = getSubKeys(path);
  const [directoryKey, fileKey] = subKeys;
  const directory = directoryMap[directoryKey];
  const file = directory && directory.find(file => file.key === fileKey);

  return (
    <Window className="DirectoryWindow" windowKey={windowKey}
            title={file ? file.name : directory ? name(directoryKey) : 'Directory'}
            iconProps={file ? { imageUrl: file.image } : { windowKey }}
            onKeyDown={e => {
              e.preventDefault();
              switch (e.keyCode) {
                case 37:
                  if (file) {
                    history.push(`/${windowKey}/${directoryKey}`);
                  } else if (directory) {
                    history.push(`/${windowKey}`);
                  }
                  break;
                case 39:
                  if (!directory) {
                    history.push(`/${windowKey}/${directoryKeys[0]}`);
                  } else if (!file) {
                    history.push(`/${windowKey}/${directoryKey}/${directory[0].key}`);
                  }
                  break;
                case 38:
                  if (file) {
                    const newFileIndex = Math.max(0, directory.indexOf(file) - 1);
                    history.push(`/${windowKey}/${directoryKey}/${directory[newFileIndex].key}`);
                  } else if (directory) {
                    const newDirectoryIndex = Math.max(0, directoryKeys.indexOf(directoryKey) - 1);
                    history.push(`/${windowKey}/${directoryKeys[newDirectoryIndex]}`);
                  }
                  break;
                case 40:
                  if (file) {
                    const newFileIndex = Math.min(directory.length - 1, directory.indexOf(file) + 1);
                    history.push(`/${windowKey}/${directoryKey}/${directory[newFileIndex].key}`);
                  } else if (directory) {
                    const newDirectoryIndex = Math.min(directoryKeys.length - 1, directoryKeys.indexOf(directoryKey) + 1);
                    history.push(`/${windowKey}/${directoryKeys[newDirectoryIndex]}`);
                  }
                  break;
              }
            }}
            windowProps={windowProps}
            {...restProps}>
      <div className="panel-container">
        <div className={classes('panel', 'panel-list')}>
          {
            directoryKeys.map(key => (
              <Link className={classes('directory', key === directoryKey && 'active')} path={`/${windowKey}/${key}`}
                    key={key}>
                <Icon className="icon" windowKey="directory"/>
                <div className="name">{name(key)}</div>
              </Link>
            ))
          }
        </div>
      </div>
      <div className="panel-container">
        {
          directory && (
            <div className={classes('panel', 'panel-list')}>
              <Link className={classes('directory', 'directory-parent')} path={`/${windowKey}`}>
                <Icon className="icon" windowKey="directory"/>
                <div className="name">..</div>
              </Link>
              {
                directory.map(file => (
                  <Link className={classes('directory', file.key === fileKey && 'active')}
                        path={`/${windowKey}/${directoryKey}/${file.key}`} key={file.key}>
                    <Icon className="icon" imageUrl={file.image}/>
                    <div className="name">{name(file.name)}</div>
                  </Link>
                ))
              }
            </div>
          )
        }
      </div>
      <div className={classes('panel-container', 'panel-container-preview')}>
        {
          file && (
            <div className={classes('panel', 'panel-preview')}>
              <img className="preview" src={file.image}/>
              {
                {
                  projects: (
                    <div className="property-container">
                      <div className={classes('property', 'property-name')}>{file.name}</div>
                      <div className={classes('property', 'property-date')}>{file.date}</div>
                      {
                        file.link === '-' ? (
                          <div className={classes('property', 'property-link')}>{file.link}</div>
                        ) : /^https:\/\/([a-zA-Z0-9_-]+\.)*jasonpark\.me/i.test(file.link) ? (
                          <Link className={classes('property', 'property-link')}
                                path={`/browser/${file.key}`}>{file.link}</Link>
                        ) : (
                          <Link className={classes('property', 'property-link')} href={file.link}>{file.link}</Link>
                        )
                      }
                      <div className={classes('property', 'property-detail')}>{file.detail}</div>
                    </div>
                  ),
                  work_experience: (
                    <div className="property-container">
                      <div className={classes('property', 'property-name')}>{file.name}</div>
                      <div className={classes('property', 'property-date')}>{file.date}</div>
                      <div className={classes('property', 'property-location')}>{file.location}</div>
                      <div className={classes('property', 'property-position')}>{file.position}</div>
                      <div className={classes('property', 'property-detail')}>
                        <div dangerouslySetInnerHTML={{ __html: file.detail }}/>
                      </div>
                    </div>
                  ),
                  awards: (
                    <div className="property-container">
                      <div className={classes('property', 'property-name')}>{file.name}</div>
                      <div className={classes('property', 'property-date')}>{file.date}</div>
                      <div className={classes('property', 'property-organizer')}>{file.organizer}</div>
                      <div className={classes('property', 'property-place')}>
                        <div dangerouslySetInnerHTML={{ __html: file.place }}/>
                      </div>
                    </div>
                  ),
                  education: (
                    <div className="property-container">
                      <div className={classes('property', 'property-name')}>{file.name}</div>
                      <div className={classes('property', 'property-type')}>
                        <div dangerouslySetInnerHTML={{ __html: file.type }}/>
                      </div>
                      <div className={classes('property', 'property-location')}>{file.location}</div>
                      <div className={classes('property', 'property-date')}>{file.date}</div>
                      <div className={classes('property', 'property-gpa')}>{file.gpa}</div>
                      {
                        file.link === '-' ? (
                          <div className={classes('property', 'property-link')}>{file.link}</div>
                        ) : (
                          <Link className={classes('property', 'property-link')} href={file.link}>{file.link}</Link>
                        )
                      }
                    </div>
                  ),
                }[directoryKey]
              }
              <Link className="close" path={`/${windowKey}/${directoryKey}`}/>
            </div>
          )
        }
      </div>
    </Window>
  );
}

export default DirectoryWindow;
