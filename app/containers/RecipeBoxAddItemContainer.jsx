import React from 'react'
import {connect} from 'react-redux';
import {v4} from 'uuid';
import Actions from '../actions/RecipeActions.js';
import RecipeBoxForm from '../components/RecipeBoxForm.jsx';

const createRecipe = ({name, ingredients}) => ({
  name: name.trim(),
  ingredients: ingredients.trim(),
  id: v4()
});
const mapDispatchToProps = (dispatch) => ({
    onSaveRecipe(recipe) {
      dispatch({
        type: Actions.RECIPE_CREATE,
        recipe: createRecipe(recipe)
      });
    }
});
const RecipeBoxAddItem = (props) => {
  return (
    <div className="recipe-add creating">        
      <div className="form">
        <h3 className="box-title">Add recipe</h3>
        <RecipeBoxForm 
          onSave={props.onSaveRecipe}  
          onCancel={() => null}
        />
      </div>        
    </div>
  );
}
  
export default connect(undefined, mapDispatchToProps)(RecipeBoxAddItem);