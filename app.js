(function () {

  // ===============================
  // DATA
  // ===============================
  const recipes = [
    { id: 1, title: "Pasta", difficulty: "easy", time: 20, ingredients: ["noodles", "sauce", "cheese"] },
    { id: 2, title: "Biryani", difficulty: "hard", time: 60, ingredients: ["rice", "chicken", "spices"] },
    { id: 3, title: "Salad", difficulty: "easy", time: 10, ingredients: ["lettuce", "tomato", "cucumber"] },
    { id: 4, title: "Burger", difficulty: "medium", time: 25, ingredients: ["bun", "patty", "cheese"] }
  ];

  // ===============================
  // STATE
  // ===============================
  let searchQuery = "";
  let selectedDifficulty = "all";
  let selectedSort = "default";
  let showFavoritesOnly = false;
  let favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];

  // ===============================
  // DOM ELEMENTS
  // ===============================
  const recipeContainer = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const sortSelect = document.getElementById("sortSelect");
  const favoritesOnlyCheckbox = document.getElementById("favoritesOnly");
  const recipeCounter = document.getElementById("recipeCounter");

  // ===============================
  // DEBOUNCE FUNCTION
  // ===============================
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // ===============================
  // RENDER FUNCTION
  // ===============================
  function renderRecipes() {
    let filteredRecipes = [...recipes];

    // Search filter
    if (searchQuery) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery) ||
        recipe.ingredients.join(" ").toLowerCase().includes(searchQuery)
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.difficulty === selectedDifficulty
      );
    }

    // Favorites only filter
    if (showFavoritesOnly) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        favoriteRecipes.includes(recipe.id)
      );
    }

    // Sorting
    if (selectedSort === "time-asc") {
      filteredRecipes.sort((a, b) => a.time - b.time);
    } else if (selectedSort === "time-desc") {
      filteredRecipes.sort((a, b) => b.time - a.time);
    }

    recipeContainer.innerHTML = "";

    filteredRecipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      const isFavorite = favoriteRecipes.includes(recipe.id);

      card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? "active" : ""}" data-id="${recipe.id}">
          ♥
        </button>
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          Difficulty: ${recipe.difficulty} <br>
          Time: ${recipe.time} mins
        </div>
        <div class="ingredients" style="display:none;">
          <strong>Ingredients:</strong>
          <ul>
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <button class="expand-btn">View Ingredients</button>
      `;

      recipeContainer.appendChild(card);
    });

    updateRecipeCounter(filteredRecipes.length);
  }

  // ===============================
  // UPDATE COUNTER
  // ===============================
  function updateRecipeCounter(visibleCount) {
    recipeCounter.textContent = `Showing ${visibleCount} of ${recipes.length} recipes`;
  }

  // ===============================
  // EVENT LISTENERS
  // ===============================

  searchInput.addEventListener("input", debounce((e) => {
    searchQuery = e.target.value.toLowerCase();
    renderRecipes();
  }, 300));

  difficultyFilter.addEventListener("change", (e) => {
    selectedDifficulty = e.target.value;
    renderRecipes();
  });

  sortSelect.addEventListener("change", (e) => {
    selectedSort = e.target.value;
    renderRecipes();
  });

  favoritesOnlyCheckbox.addEventListener("change", (e) => {
    showFavoritesOnly = e.target.checked;
    renderRecipes();
  });

  recipeContainer.addEventListener("click", (e) => {

    // Toggle Favorite
    if (e.target.classList.contains("favorite-btn")) {
      const id = Number(e.target.dataset.id);

      if (favoriteRecipes.includes(id)) {
        favoriteRecipes = favoriteRecipes.filter(favId => favId !== id);
      } else {
        favoriteRecipes.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
      renderRecipes();
    }

    // Expand Ingredients
    if (e.target.classList.contains("expand-btn")) {
      const ingredientsDiv = e.target.previousElementSibling;
      const isHidden = ingredientsDiv.style.display === "none";
      ingredientsDiv.style.display = isHidden ? "block" : "none";
      e.target.textContent = isHidden ? "Hide Ingredients" : "View Ingredients";
    }

  });

  // ===============================
  // INITIAL LOAD
  // ===============================
  renderRecipes();

})();