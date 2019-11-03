
// searches for recipes based off the keyword we put into input box


///////////////////////// RECIPES INFORMATION SEARCH  /////////////////////////

function renderRecipes() {
  // grabs the text we add into input box
  let search = document.getElementById("query").value;

  // api call to endpoint(url)
  fetch(`https://api.spoonacular.com/recipes/search?apiKey=9860175d99234c3183aa34e27a1f584f&query=${search}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()) // then we turn the response to JSON
      .then(response => findRecipeId(response)); // then we pass the JSON to a function
}

// gets the ID of the results produced from our query
function findRecipeId(response) {
    const { results } = response;
    results.forEach(function(recipe) {
      getRecipeInfoById(recipe.id);
  });
}

// query for recipe with given id
function getRecipeInfoById(id) {
  fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=9860175d99234c3183aa34e27a1f584f`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => renderRecipe(response));
}

function renderRecipe(recipeInfo) {

  // let paragraph = document.getElementById("search");
  // let recipes = document.createTextNode(recipeInfo.title);
  // paragraph.appendChild(recipes);
}

///////////////////////// RECIPES INFORMATION SEARCH  /////////////////////////

/////// To implement a different search for another search field, copy and paste the template above and change the function names/API endpoints