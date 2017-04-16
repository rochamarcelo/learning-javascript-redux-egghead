import React from 'react'
import RecipeListContainer from '../containers/RecipeListContainer.jsx';
import RecipeBoxAddItemContainer from '../containers/RecipeBoxAddItemContainer.jsx';
import ShowTypeBar from '../components/ShowTypeBar.jsx';

export default () => {
  return (
    <div className="recipe-box">
      <h1>Recipe box</h1>
      <ShowTypeBar />
      <RecipeListContainer />
      <RecipeBoxAddItemContainer />
      <ShowTypeBar />
    </div>
  );
}
