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
