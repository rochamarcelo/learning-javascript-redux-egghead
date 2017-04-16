import React from 'react';

class RecipeBoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.getInitialItemState();
  }
  getInitialItemState() {
    return {
      recipe: {
        name: this.props.recipe.name,
        ingredients: this.props.recipe.ingredients,
        id: this.props.recipe.id
      }
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave(this.state.recipe);
    this.setState(this.getInitialItemState());
  }
  
  handleCancel(e) {
    e.preventDefault();    
    this.props.onCancel();
    this.setState(this.getInitialItemState());
  }
  
  handleChange(e) {
    var recipe = this.state.recipe;
    recipe[e.target.name] = e.target.value;
    this.setState({recipe: recipe});
  }  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <div className="input-row">
            <label>Recipe</label>
            <input 
              name="name" 
              type="text" 
              value={this.state.recipe.name}
              onChange={this.handleChange}
              placeholder="Recipe Name" 
            />
          </div>
          <div className="input-row">
            <label>Ingredients</label>
            <input 
              name="ingredients" 
              type="text"
              onChange={this.handleChange}
              value={this.state.recipe.ingredients}
              placeholder="Enter Ingredients,Separated,By Commas"
            />
          </div>
          <div className="action input-row">
            <input type="submit" className="btn-primary" value="Save" />{" "}
            <span onClick={this.handleCancel} href="#" className="btn-default">Cancelar</span>
          </div>
        </form>
    );
  }
}
RecipeBoxForm.defaultProps = {
  recipe: {
    name: '',
    ingredients: '',
    id: null
  }
};

export default RecipeBoxForm;