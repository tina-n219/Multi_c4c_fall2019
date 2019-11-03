//API documentation: https://spoonacular.com/food-api

// 1) This function sends a query to the API and asks for a list of all recipes. It then passes it into a helper function that grabs the ID's for each individual recipe. We need the ID's so we get to query the API for even more information!
function renderRecipes() {
  // Grabs the text the user entered from the input field in our HTML document
  let search = document.getElementById("query").value;

  // API call to endpoint (URL)
  fetch(`https://api.spoonacular.com/recipes/search?apiKey=9860175d99234c3183aa34e27a1f584f&query=${search}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()) // First, we convert the response (result) that we get into JSON format. The respone is a list of recipes with ID's for each recipe. We convert it to JSON so that we can work with it in our code.
      .then(response => findRecipeId(response)); // Then, we pass the JSON information to a function that will help us grab every ID!
}

// 2) This function takes in the response (the list of recipes) that we passed in in the function above. It iterates over the recipes, and passes each ID into another helper function.
function findRecipeId(response) {
    const { results } = response;
    results.forEach(function(recipe) {
      getRecipeInfoById(recipe.id); // ... And another helper function that will give us specific information based on one ID ...
  });
}

// This function takes in an ID for one recipe, and queries the API for more information on that one recipe
function getRecipeInfoById(id) {

  // Note how we sepecified the ID in our endpoint!
  fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=9860175d99234c3183aa34e27a1f584f`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()) // The response here is information on one recipe. We convert it to JSON again...
    .then(response => renderRecipe(response)); // And pass in the information to a helper function...
}

// 4) This function takes in information for one recipe and renders it in the browser. This is where we pass in our data from our query and insert it into our HTML code!
function renderRecipe(recipeInfo) {

  // 1) Let's grab our list of results (ul) from our HTML document...
  let results = document.getElementById("results");

  // 2) Let's create a new empty list element (li) for our new result..
  let newResult = document.createElement("li");
  // Note that this element is not inserted in our HTML just yet! It's just floating around in this function... for now..

  // 3) Now, let's add some information to the new list item (li) that we just created. From the recipe that we passed in to this function, let's append the title of the recipe...
  newResult.appendChild(document.createTextNode(recipeInfo.title));

  // 4) Finally, we append our new result (li) to our list (ul) of results! It is now inserted in our HTML document.
  results.appendChild(newResult);
}