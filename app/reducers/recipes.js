import {combineReducers} from 'redux';
import Actions from '../actions/RecipeActions.js';
console.log("actions", Actions);
const byId = (state = {}, action) => {
  switch(action.type) {
    case Actions.RECIPE_RECEIVE:
      let recieveState = {...state};
      action.response.forEach(recipe => {
        recieveState[recipe.id] = recipe;
      });
      return recieveState;
    case Actions.RECIPE_CREATE:
      return {
        ...state,
        [action.recipe.id]: action.recipe
      };
    case Actions.RECIPE_EDIT: 
      return {
        ...state,
        [action.recipe.id]: action.recipe
      };
    case Actions.RECIPE_TOGGLE:
      let toggleState = {};
      Object.keys(state).map(function(key) {
        let item = state[key];
        toggleState[key] = {
          ...item,
          selected: item.id !== action.id ? false : !item.selected
        };
      });
      return toggleState;
    case Actions.RECIPE_TOGGLE_LIKE:
      let item = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...item,
          liked: !item.liked
        }
      };
    case Actions.RECIPE_REMOVE:
      let removeState = {...state};
      delete removeState[action.id];
      return removeState;
    default:
      return state;
  }
};

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
        return state;
    }
    switch (action.type) {
      case Actions.RECIPE_RECEIVE:
        return action.response.map(recipe => recipe.id);
      default: 
        return state;
    }
  };
  
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
        return state;
    }
    switch (action.type) {
      case Actions.RECIPE_REQUEST:
        return true;
      case Actions.RECIPE_RECEIVE:
        return false;
      default: 
        return state;
    }
  }
  
  return combineReducers({
    ids,
    isFetching,
  });
}

const idsByFilter = combineReducers({
  all: createList('all'),
  liked: createList('liked'),
  unliked: createList('unliked'),
});
const recipes = combineReducers({
  byId,
  idsByFilter
});

export default recipes;
const getRecipe = (state, id) => state[id];

export const getVisibleRecipes = (state, filter) => {
  const ids = state.idsByFilter[filter]['ids'];
  
  return ids.map(id => getRecipe(state.byId, id));
}

export const getIsFetching = (state, filter) => state.idsByFilter[filter].isFetching;