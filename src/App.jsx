import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import './App.css';
import { getFavoriteSongs } from './services/favoriteSongsAPI';
import { getUser } from './services/userAPI';

class App extends React.Component {
  state = {
    user: {},
    favorites: [],
    usrLoading: false,
  }

  fetchUser = async () => {
    this.setState({ usrLoading: true }, async () => {
      const user = await getUser();
      this.setState({ user, usrLoading: false });
    });
  }

  fetchFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { user, favorites, usrLoading } = this.state;
    return (
      <div>
        <Route
          path={ ['/search', '/album/:id', '/favorites', '/profile', '/profile/edit'] }
          render={ () => (
            <Header user={ user } fetchUser={ this.fetchUser } loading={ usrLoading } />
          ) }
        />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route
            exact
            path="/album/:id"
            render={ (routeProps) => (
              <Album
                { ...routeProps }
                favorites={ favorites }
                fetchFavorites={ this.fetchFavorites }
              />
            ) }
          />
          <Route
            exact
            path="/favorites"
            render={ () => (
              <Favorites
                favorites={ favorites }
                fetchFavorites={ this.fetchFavorites }
              />
            ) }
          />
          <Route
            exact
            path="/profile"
            render={ () => (
              <Profile
                user={ user }
                fetchUser={ this.fetchUser }
                loading={ usrLoading }
              />
            ) }
          />
          <Route
            exact
            path="/profile/edit"
            render={ (routeProps) => (
              <ProfileEdit
                { ...routeProps }
                user={ user }
                fetchUser={ this.fetchUser }
                loading={ usrLoading }
              />
            ) }
          />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
