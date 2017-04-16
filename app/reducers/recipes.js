import {combineReducers} from 'redux';
import Actions from '../actions/RecipeActions.js';

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
    switch (action.type) {
      case Actions.RECIPE_RECEIVE:
        if (action.filter !== filter) {
          return state;
        }
        return action.response.map(recipe => recipe.id);
      case Actions.RECIPE_CREATE:
        switch (filter) {
          case 'liked':
            return action.recipe.liked ? [...state, action.recipe.id] : state
          case 'unliked':
            return !action.recipe.liked ? [...state, action.recipe.id] : state
          default:
            return [...state, action.recipe.id];
        }
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