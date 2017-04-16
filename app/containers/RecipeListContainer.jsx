import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions/RecipeActions.js';
import {getVisibleRecipes, getIsFetching} from '../reducers/index.js';
import RecipeBoxItem from '../components/RecipeBoxItem.jsx'

const mapStateToProps = (state, {match}) => {
  let filter = match.params.filter || 'all';
  return {
    filter: filter,
    recipes: getVisibleRecipes(state, filter),
    isFetching: getIsFetching(state, filter),
  };
};
// const receiveRecipes = (filter, response) => ({
//   type: Actions.RECIPE_RECEIVE,
//   filter,
//   response,
// });
// const fetchRecipes = (filter) => {
//   return api.fetchRecipes(filter).then(recipes => {
//     console.log(filter, recipes);
//     return receiveRecipes(filter, recipes);
//   });
// };

// const mapDispatchToProps = (dispatch) => ({   
//     onSaveRecipe(recipe) {
//       dispatch({
//         type: Actions.RECIPE_EDIT,
//         recipe: {
//           ...recipe,
//           editing: false
//         }
//       });
//     },
//     onRemoveRecipe(recipe) {
//       dispatch({
//         type: Actions.RECIPE_REMOVE,
//         id: recipe.id
//       });
//     },
//     onStartEditingRecipe(recipe) {  
//       dispatch({
//         type: Actions.RECIPE_EDIT,
//         recipe: {
//           ...recipe,
//           editing: true
//         }
//       });
//     },
//     onCancelEditingRecipe(recipe) {
//       dispatch({
//         type: Actions.RECIPE_EDIT,
//         recipe: {
//           ...recipe,
//           editing: false
//         }
//       });
//     },
//     onToggleItem(recipe) {
//       dispatch({
//         type: Actions.RECIPE_TOGGLE,
//         id: recipe.id 
//       });
//     },
//     onToggleLikeItem(recipe) {
//       dispatch({
//         type: Actions.RECIPE_TOGGLE_LIKE,
//         id: recipe.id 
//       });
//     },
//     fetchRecipes(filter) {
//       dispatch(fetchRecipes(filter || 'all'));
//     }
//   });
class RecipeList extends Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }
  fetchData() {
    const { filter, fetchRecipes} = this.props;
    fetchRecipes(filter).then(response => console.log('fetch filter ' +  filter));
  }
  render() {
    let {
      recipes, 
      removeRecipe, 
      editRecipe,
      startEditingRecipe,
      cancelEditingRecipe,
      toggleItem,
      toggleLikeItem,
      isFetching
    } = this.props;
    if (isFetching && !recipes.length) {
      return <p>Loading...</p>;
    }
    let items = recipes.filter(recipe =>  {
      return recipe != null;
    }).map(recipe => {
        let original = {...recipe};
        return (<RecipeBoxItem 
                key={original.id}
                recipe={original}
                onSaveRecipe={editRecipe} 
                onRemoveRecipe={() => removeRecipe(original)}
                onStartEditingRecipe={() => startEditingRecipe(original)}
                onCancelEditingRecipe={() => cancelEditingRecipe(original)}
                onToggleItem={() => toggleItem(original)}
                onToggleLikeItem={() => toggleLikeItem(original)}
               />)
    });

    return (<div className="recipe-list">{items}</div>);
  }
}

export default withRouter(connect(mapStateToProps, actions)(RecipeList));