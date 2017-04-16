const promise = (store) => (next) => (action) => {
  if (action.then && typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};
const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action); 
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};
const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => 
    store.dispatch = middleware(store)(store.dispatch)
  )
}
export default (store) => {
    const middlewares = [promise];
    
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    wrapDispatchWithMiddlewares(store, middlewares);

    return store;
}