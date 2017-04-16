import React from 'react'
import RecipeBoxItemDetails from './RecipeBoxItemDetails.jsx';
import RecipeBoxForm from './RecipeBoxForm.jsx';
export default (props) => {    
  let itemClass = 'recipe-item active';
  if ( props.recipe.editing ) {
    itemClass += ' editing';
  }
  const itemInfo = () => {
    if (!props.recipe.selected) {
      return '';
    }
    return (<div className="item-info">
        <RecipeBoxItemDetails recipe={props.recipe} />
        <div className="actions">
          <button onClick={props.onRemoveRecipe} className="btn-danger">Delete</button>
          {" "}
          <button onClick={props.onStartEditingRecipe} className="btn-default">
            Edit
          </button>
          {" "}
          <button onClick={props.onToggleLikeItem} className={props.recipe.liked ? "btn-warning" : "btn-info"}>
            {props.recipe.liked ? 'Unlike' : 'Like'}
          </button>
        </div>
        {props.recipe.editing ? <RecipeBoxForm 
                                  recipe={props.recipe} 
                                  onSave={props.onSaveRecipe}  
                                  onCancel={props.onCancelEditingRecipe}
                                  /> : ""}
      </div>);
  }
  return (
    <div className={itemClass}>
      <h3 className="box-title" onClick={props.onToggleItem}>
        {props.recipe.name} {props.recipe.liked ? '( liked )' : ''}
      </h3>
      {itemInfo()}
    </div>
  );
};