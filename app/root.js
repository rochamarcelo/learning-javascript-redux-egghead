import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import RecipeBox from './components/RecipeBox.jsx';
import store from './store.js';

ReactDOM.render(
  <Provider store={store()}>
    <BrowserRouter>
        <Route path="/:filter?" component={RecipeBox} />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('content')
);