import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StoreContextProvider from "./context/StoreContext";
import Header from "./components/layout/Header";
import Overlay from "./components/layout/Overlay";
import Index from "./components/layout/Index";
import Library from "./components/library/Library";
import Favorites from "./components/favorites/Favorites";
import VideoGamePage from "./components/game/VideoGamePage";

import "./App.css";
import "./assets/style/Store.css";
import "./assets/style/Search.css";
import "./assets/style/Game.css";
import "./assets/style/Buttons.css";
import "./assets/style/Navbar.css";
import "./assets/style/Library.css";
import "./assets/style/Favorites.css";
import "./assets/style/Lists.css";
import "./assets/style/Mobile.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <StoreContextProvider>
      <Router>
        <Header />
        <div className="container">
          <Overlay />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/library" component={Library} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/game/:id" component={VideoGamePage} />
          </Switch>
        </div>
      </Router>
    </StoreContextProvider>
  );
};

export default App;
