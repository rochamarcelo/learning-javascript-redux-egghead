import * as api from '../api/index.js';

const act = {
  RECIPE_CREATE: 'RECIPE_CREATE',
  RECIPE_EDIT: 'RECIPE_EDIT',
  RECIPE_REMOVE: 'RECIPE_REMOVE',
  RECIPE_TOGGLE: 'RECIPE_TOGGLE',
  RECIPE_TOGGLE_LIKE: 'RECIPE_TOGGLE_LIKE',
  RECIPE_RECEIVE: 'RECIPE_RECEIVE',
  RECIPE_REQUEST: 'RECIPE_REQUEST'
};
export default act;
export const editRecipe = (recipe) => ({
  type: act.RECIPE_EDIT,
  recipe: {
    ...recipe,
    editing: false
  }
});
export const removeRecipe = (recipe) => ({
  type: act.RECIPE_REMOVE,
  id: recipe.id
});

export const startEditingRecipe = (recipe) => ({  
  type: act.RECIPE_EDIT,
  recipe: {
    ...recipe,
    editing: true
  }
});
export const cancelEditingRecipe = (recipe) => ({
  type: act.RECIPE_EDIT,
  recipe: {
    ...recipe,
    editing: false
  }
});
export const toggleItem = (recipe) => ({
  type: act.RECIPE_TOGGLE,
  id: recipe.id 
});
export const toggleLikeItem = (recipe) => ({
  type: act.RECIPE_TOGGLE_LIKE,
  id: recipe.id
});
const requestRecipes = (filter) => ({
  type: act.RECIPE_REQUEST,
  filter
});

const receiveRecipes = (filter, response) => ({
  type: act.RECIPE_RECEIVE,
  filter,
  response,
});

export const fetchRecipes = (filter = 'all') => (dispatch, getState) => {

  if(getState().recipes.idsByFilter[filter].isFetching) {
    return Promise.resolve();
  }
  dispatch(requestRecipes(filter));
  
  return api.fetchRecipes(filter).then(recipes => {
    console.log(filter, recipes);
    dispatch(receiveRecipes(filter, recipes));
  });
};