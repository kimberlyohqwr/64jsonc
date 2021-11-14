import React, { useState } from 'react';
import './stylesheet.scss';
import { classes, name } from 'common/utils';
import * as directoryMap from './data';
import Window from 'components/Window';
import Link from 'components/Link';
import Icon from 'components/Icon';

function DirectoryWindow(props) {
  const [subKeys, setSubKeys] = useState([]);
  const [directoryKey, fileKey] = subKeys;
  const file = directoryMap[directoryKey] && directoryMap[directoryKey].find(file => file.key === fileKey);

  return (
    <Window className="DirectoryWindow" windowKey="directory" defaultWidth={50 * 16} defaultHeight={30 * 16}
            onChangeSubKeys={setSubKeys} {...props}>
      <div className="panel-container">
        <div className={classes('panel', 'panel-list')}>
          {
            Object.keys(directoryMap).map(key => (
              <Link className={classes('directory', key === directoryKey && 'active')} path={`/directory/${key}`}
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
          directoryMap[directoryKey] && (
            <div className={classes('panel', 'panel-list')}>
              <Link className={classes('directory', 'directory-parent')} path="/directory">
                <Icon className="icon" windowKey="directory"/>
                <div className="name">..</div>
              </Link>
              {
                directoryMap[directoryKey].map(file => (
                  <Link className={classes('directory', file.key === fileKey && 'active')}
                        path={`/directory/${directoryKey}/${file.key}`} key={file.key}>
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
              <Link className="close" path={`/directory/${directoryKey}`}/>
            </div>
          )
        }
      </div>
    </Window>
  );
}

export default DirectoryWindow;
