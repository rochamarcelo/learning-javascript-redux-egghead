export default {  
  save: function(recipes) {
    recipes = JSON.stringify(recipes);
    try {
      window.localStorage.setItem('_rochamar_recipedata', recipes);
      window.localStorage.setItem('_rochamar_recipes_modified', 1);
    } catch(err) {
      console.log(err);
    }
  },
  get: function() {
    try {
      var recipes = window.localStorage['_rochamar_recipedata'];
      if ( recipes ) {
        return JSON.parse(recipes);
      }
      return undefined;
    } catch(err) {
      console.log(err);
      return undefined;
    }
  }
};