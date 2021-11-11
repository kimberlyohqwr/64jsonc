import React from 'react';
import './stylesheet.scss';
import { name } from 'common/utils';
import * as directoryMap from './data';
import Window from 'components/Window';
import Link from 'components/Link';
import Icon from 'components/Icon';

function DirectoryWindow(props) {
  return (
    <Window className="DirectoryWindow" windowKey="directory" defaultWidth={50 * 16} defaultHeight={30 * 16} {...props}>
      <div className="panel-container">
        <div className="panel panel-root open">
          {
            Object.keys(directoryMap).map(directoryKey => (
              <Link className="directory" path={`/directory/${directoryKey}`} key={directoryKey}>
                <Icon className="icon" path="/directory"/>
                <div className="name">{name(directoryKey)}</div>
              </Link>
            ))
          }
        </div>
      </div>
    </Window>
  );
}

/*
.panel-container
each child in ['projects', 'work_experience', 'awards', 'education']
  .panel.panel-child(id=`directory-${child}`)
    a.directory.directory-parent(href='#directory-')
      .icon.icon-directory
      .name ..
    each file in data[child]
      a.directory(href=`#directory-${child}-${file.key}`)
        .icon(style=`background-image: url(${file.image})`)
        .name= file.name
.panel-container.panel-container-preview
mixin panel-preview(child, file)
  .panel.panel-preview(id=`directory-${child}-${file.key}`)
    img.preview(src=file.image)
    .property-container
      block
    a.close(href=`#directory-${child}`)
each file in data.projects
  +panel-preview('projects', file)
    .property.property-name= file.name
    .property.property-date= file.date
    if file.link === '-'
      .property.property-link= file.link
    else if /^https:\/\/([a-zA-Z0-9_-]+\.)*jasonpark\.me/i.test(file.link)
      a.property.property-link(href=`#browser-${file.key}`, data-name=file.name, data-image=file.image, data-url=file.link)= file.link
    else
      a.property.property-link(href=file.link)= file.link
    .property.property-detail= file.detail
each file in data.work_experience
  +panel-preview('work_experience', file)
    .property.property-name= file.name
    .property.property-date= file.date
    .property.property-location: div!= file.location
    .property.property-position= file.position
    .property.property-detail: div!= file.detail
each file in data.awards
  +panel-preview('awards', file)
    .property.property-name= file.name
    .property.property-date= file.date
    .property.property-organizer= file.organizer
    .property.property-place: div!= file.place
each file in data.education
  +panel-preview('education', file)
    .property.property-name= file.name
    .property.property-type!= file.type
    .property.property-location: div!= file.location
    .property.property-date= file.date
    .property.property-gpa= file.gpa
    if file.link === '-'
      .property.property-link= file.link
    else
      a.property.property-link(href=file.link)= file.link

 */

export default DirectoryWindow;
