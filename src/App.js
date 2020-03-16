import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch
} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import SiteBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import MyProfile from './components/User/MyProfile';
// import MyGames from './components/User/MyGames';
import MyFriends from './components/User/MyFriends';
import GamesIndex from './components/Games/GamesIndex';
// import SearchGames from './components/Games/SearchGames';
// import GameProfile from './components/Games/GameProfile';


function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [ownerId, setOwnerId] = useState('');


  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null) {
      setSessionToken(localStorage.getItem('token'));
    }
    if (localStorage.getItem('userid') && localStorage.getItem('userid') !== 'undefined' && localStorage.getItem('userid') !== null) {
      setOwnerId(localStorage.getItem('userid'));
    }
  })

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    // console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    if (sessionToken === localStorage.getItem('token')) {
      return (
        <>
          <Router>
            <SiteBar clickLogout={clearToken} token={sessionToken} />
            <Switch>
              <Route exact path="/">
                <Home ownerid={ownerId} token={sessionToken} />
              </Route>
              <Route exact path="/home">
                <Home ownerid={ownerId} token={sessionToken} />
              </Route>
              {/* <Route exact path="/user/myprofile">
                <MyProfile ownerid={ownerId} token={sessionToken} />
              </Route> */}
              <Route exact path="/user/mygames">
                <GamesIndex ownerid={ownerId} token={sessionToken} view="owner" />
              </Route>
              {/* <Route exact path="/user/myfriends">
                <MyFriends ownerid={ownerId} token={sessionToken} />
              </Route> */}
              <Route exact path="/game/search">
                <GamesIndex ownerid={ownerId} token={sessionToken} view="search" />
              </Route>
              <Route exact path="/game/:id">
                <GamesIndex ownerid={ownerId} token={sessionToken} view="profile" />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </>
      );
    } else {
      return <Auth updateToken={updateToken} />
    }
  }

  return (
    <div className="App">
      {protectedViews()}
    </div>
  );
}

export default App;
