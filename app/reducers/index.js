import {combineReducers} from 'redux';
import recipes, * as fromRecipes from './recipes.js';

const recipeApp = combineReducers({
    recipes
});

export default recipeApp;
export const getVisibleRecipes = (state, filter) => fromRecipes.getVisibleRecipes(state.recipes, filter);
export const getIsFetching = (state, filter) => fromRecipes.getIsFetching(state.recipes, filter);