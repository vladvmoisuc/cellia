import React, { useState } from 'react';

import Home from './containers/Home';
import Chat from './containers/Chat';

import './App.scss';

function App() {
  const [hasLoggedIn, setLoginStatus] = useState(false);
  const [isNewUser, setUserStatus] = useState(false);

  return (
    <div className="app">
      {isNewUser || hasLoggedIn ? (
        <Chat hasLoggedIn={hasLoggedIn} />
      ) : (
        <Home onLogin={setLoginStatus} onSelect={setUserStatus} />
      )}
    </div>
  );
}

export default App;
