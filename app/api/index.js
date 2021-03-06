import {v4} from 'uuid';

const createRecipe = ({name, ingredients}) => ({
  name: name.trim(),
  ingredients: ingredients.trim(),
  id: v4()
});

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));
const fakeDatabase = {
    recipes: [
        {
            id: 10000,
            name: 'Spaghetti',
            ingredients: 'Noodles,Tomato Sauce,(Optional) Meatballs',
            selected: true
        }, 
        {
            id: 100003,
            name: 'Spaghetti 2',
            ingredients: 'Noodles,Tomato Sauce',
            liked: true,
            selected: false
        }, 
        {
            id: 100004,
            name: 'Cake',
            ingredients: 'Eggs,Chocolate',
            selected: false
        }, 
    ]   
}

export const fetchRecipes = (filter) =>
  delay(2500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.recipes;
      case 'liked':
        return fakeDatabase.recipes.filter(t => t.liked);
      case 'unliked':
        return fakeDatabase.recipes.filter(t => !t.liked);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export const addRecipe = (recipe) => {
  const response = createRecipe(recipe);
  return delay(500).then(() => {
    fakeDatabase.recipes.push(response);
    return response;
  });
};