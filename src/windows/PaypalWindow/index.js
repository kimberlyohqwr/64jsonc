import React from 'react';

import { Icon, Window } from 'components';
import { getUrlKeys } from 'common/utils';
import { donations } from 'data';

import './stylesheet.scss';

function PaypalWindow(props) {
  const { app } = props;
  const { url } = app;
  const [, status] = getUrlKeys(url);
  const isSuccess = status === 'success';

  return (
    <Window className="PaypalWindow" noToolbar
            defaultWidth={50 * 16} defaultHeight={30 * 16}
            toolbarStyle={{
              backgroundImage: 'radial-gradient(circle at center, #009cde, #003087 125%)',
            }}
            contentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...props}>
      {
        isSuccess && (
          <div className="paypal-success"/>
        )
      }
      <div className="message"/>
      <div className="donation-container">
        {
          donations.map(donation => (
            <form key={donation.hosted_button_id} className="donation" action="https://www.paypal.com/cgi-bin/webscr"
                  method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick"/>
              <input type="hidden" name="hosted_button_id" value={donation.hosted_button_id}/>
              <Icon className="icon" iconUrl={donation.image}/>
              <div className="name">{donation.name}</div>
              <div className="price">{donation.price}</div>
              <button className="donate" type="submit"/>
            </form>
          ))
        }
      </div>
    </Window>
  );
}

export default PaypalWindow;
