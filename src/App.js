import React from 'react';
import Navbar from './components/navbar';
import NavbarLanding from './components/navbarLanding';
import { ParallaxProvider } from 'react-scroll-parallax';
import isLogin from './utils/isLogin';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';
import Landing from './components/landing/Parallax';
import './statics/css/darkUI.css';
import './statics/css/app.css';

function App() {
  console.log(`
  .d88888b                                       dP   dP   dP          .8888b .8888b dP          
  88.    "'                                      88   88   88          88   " 88   " 88          
  'Y88888b. dP    dP  88d888b. .d8888b. 88d888b. 88  .8P  .8P .d8888b. 88aaa  88aaa  88 .d8888b. 
        '8b 88    88  88'  '88 88ooood8 88'  '88 88  d8'  d8' 88'  '88 88     88     88 88ooood8 
  d8'   .8P 88.  .88  88.  .88 88.  ... 88       88.d8P8.d8P  88.  .88 88     88     88 88.  ... 
   Y88888P  '88888P'  88Y888P' '88888P' dP       8888' Y88'   '88888P8 dP     dP     dP '88888P' 
  ooooooooooooooooooo~88~oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                      dP                                                                         
  `);
  return (
    <main>
      {isLogin() && <Navbar sticky="top" />}
      {!isLogin() && <NavbarLanding sticky="top" />}
      {!isLogin() && (
        <ParallaxProvider>
          <Landing />
        </ParallaxProvider>
      )}
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
