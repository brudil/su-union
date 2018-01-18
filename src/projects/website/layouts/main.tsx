import React from 'react';
import Header from '~components/Header';
import { DesktopUserBar as UserBar } from '~components/UserBar';
import MobileFooterTreats from '~components/MobileFooterTreats';
// import PrefooterMenu from '~components/PrefooterMenu';
import Footer from '~components/Footer';
import Main from '~components/Main';
import AdvertBar from '~components/AdvertBar';
import MSLTag from '~components/MSLTag';
import DonatelloBanner from '../../../icons/donatello.svg';

const ga = `!function(u,s,S,U){u.GoogleAnalyticsObject=S;u[S]||(u[S]=function(){
(u[S].q=u[S].q||[]).push(arguments)});u[S].l=+new Date;U=s.createElement('script');
var e=s.scripts[0];U.src='//www.google-analytics.com/analytics.js';
e.parentNode.insertBefore(U,e)}(window,document,'ga');

ga('create', 'UA-258929-3', 'auto');
ga('send', 'pageview');`;

const mslLogout = MSLTag('LoginButton', {
  LoginText: 'Log in',
  LogoutText: 'Log out',
  GoHomeOnLogout: 'True',
});

interface IProps {
  legacy: boolean;
  loggedIn: boolean;
  assets: {
    main: {
      js: string;
    }
    vendor: {
      js: string;
    }
  }
}

const mainLayout: React.SFC<IProps> = ({ assets, legacy }) => (
  <div className="Body" id="top">
    <div
      style={{ display: 'none' }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${MSLTag('ControlPanel')}${MSLTag('Admin')}${mslLogout}`,
      }}
    />
    <div className="Site">
      <AdvertBar className="AdvertBar--top" position="TopBanner" />
      <UserBar />
      <Header />
      <Main legacy={legacy} />
      <MobileFooterTreats />
      {/* <PrefooterMenu /> */}
      <Footer />
      <div className="AdvertBar AdvertBar--donatello">
        <a className="AdvertBar__advert" href="http://www.donatello.co.uk/?utm_source=ussu&utm_medium=footer">
          <DonatelloBanner />
        </a>
      </div>
    </div>
    <div className="js__modal" />
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=es6,es7,default-3.6,performance.now,Object.entries&flags=gated&callback=hasPolyfilled&unknown=polyfill" />
    <script src={assets.vendor.js} />
    <script src={assets.main.js} />
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: ga }} />
    <noscript>
      <img
        alt=""
        src="https://secure.leadforensics.com/110817.png"
        style={{ display: 'none' }}
      />
    </noscript>
  </div>
);

mainLayout.defaultProps = {
  legacy: false,
  loggedIn: false,
};

export default mainLayout;