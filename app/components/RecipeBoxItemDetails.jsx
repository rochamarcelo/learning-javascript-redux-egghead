import React from 'react'
export default ({recipe}) => {
  let ingredients = recipe.ingredients.split(',').map((text, key) => {
    return <li key={key}>{text.trim()}</li>;
  });
  return (
    <div className="details">
      <div className="ingredients">
        <h4>Ingredients</h4>
        <ul>{ingredients}</ul>
      </div>          
    </div>
  );
};