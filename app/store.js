import { createStore, applyMiddleware } from 'redux';
import recipeApp from './reducers/index.js';
// import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
// import throttle from 'lodash/throttle';
// import storage from './storage/RecipeStorage.js';
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);

export default () => {
    // const store = createStore(recipeApp, {recipes: storage.get()});
    // const saveStore = () => {
    //     storage.save(store.getState().recipes);
    // };
    // store.subscribe(throttle(saveStore, 1000));
    
    const middlewares = [thunk];
    
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return  createStore(recipeApp, applyMiddleware(...middlewares));
}