import React from 'react'
import {connect} from 'react-redux';
import Actions from '../actions/RecipeActions.js';
import RecipeBoxForm from '../components/RecipeBoxForm.jsx';
import * as api from '../api/index.js';

const mapDispatchToProps = (dispatch) => ({
    onSaveRecipe(recipe) {
      api.addRecipe(recipe).then(response => {
        dispatch({
          type: Actions.RECIPE_CREATE,
          recipe: response
        });
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