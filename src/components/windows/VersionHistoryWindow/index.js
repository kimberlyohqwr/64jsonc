import React from 'react';
import './stylesheet.scss';
import { Link, Window } from 'components';
import { classes } from 'common/utils';

function VersionHistoryWindow(props) {
  return (
    <Window className="VersionHistoryWindow"
            defaultWidth={30 * 16} defaultHeight={30 * 16}
            {...props}>
      <div className="version-container">
        {
          [0, 1, 2].map(version => (
            <Link className={classes('version', `version-${version}`)} key={version}
                  url={`/browser/history-v${version}`}/>
          ))
        }
      </div>
    </Window>
  );
}

export default VersionHistoryWindow;

/*
+window('version_history', 30, 30)
  .version-container
    each version in [0, 1, 2]
      a.version(class=`version-${version}`, href=`#browser-v_${version}`, data-name=`Version ${version}`, data-image='img/icon/version_history.png', data-url=`./version_history/v${version}/`)

 */
