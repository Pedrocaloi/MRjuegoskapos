import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './views/LandingPage/LandingPage.js';
import Home from './views/Home/Home.js';
import Form from './views/Form/Form.js';
import Detail from './views/Detail/Detail.js';

import './App.css';


export default function App() {
  return (
    <BrowserRouter>
      <div className="App h-fit">
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/form' component={Form} />
        <Route exact path='/videogames/:id' component={Detail} />
      </div>
    </BrowserRouter>
  );
}
