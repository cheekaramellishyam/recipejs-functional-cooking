const RecipeApp = (() => {
    console.log("RecipeApp initializing...");

    // ==========================
    // PRIVATE VARIABLES
    // ==========================
    const recipeContainer = document.getElementById("recipe-container");

    let recipes = [
        {
            id: 1,
            title: "Pasta",
            difficulty: "easy",
            time: 20,
            ingredients: ["Pasta", "Salt", "Water", "Tomato Sauce", "Olive Oil"],
            steps: [
                "Boil water",
                "Add pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add tomato sauce",
                        {
                            text: "Spice mix",
                            substeps: [
                                "Add salt",
                                "Add chili flakes"
                            ]
                        }
                    ]
                },
                "Drain pasta",
                "Mix and serve"
            ]
        },
        {
            id: 2,
            title: "Salad",
            difficulty: "easy",
            time: 10,
            ingredients: ["Lettuce", "Tomato", "Cucumber", "Salt", "Lemon"],
            steps: [
                "Wash vegetables",
                "Chop vegetables",
                "Mix in bowl",
                "Add salt and lemon",
                "Serve fresh"
            ]
        }
        // Add remaining 6 recipes similarly
    ];

    // ==========================
    // RECURSIVE STEP RENDERING
    // ==========================
    const renderSteps = (steps, level = 0) => {
        let html = "<ol>";

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li class="level-${level}">${step}</li>`;
            } else {
                html += `<li class="level-${level}">${step.text}`;
                html += renderSteps(step.substeps, level + 1);
                html += "</li>";
            }
        });

        html += "</ol>";
        return html;
    };

    const createStepsHTML = (steps) => {
        return `<div class="steps-container">${renderSteps(steps)}</div>`;
    };

    const createIngredientsHTML = (ingredients) => {
        return `
            <div class="ingredients-container">
                <ul>
                    ${ingredients.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        `;
    };

    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                <p>Difficulty: ${recipe.difficulty}</p>
                <p>Time: ${recipe.time} mins</p>

                <button class="toggle-btn"
                    data-recipe-id="${recipe.id}"
                    data-toggle="steps">
                    Show Steps
                </button>

                <button class="toggle-btn"
                    data-recipe-id="${recipe.id}"
                    data-toggle="ingredients">
                    Show Ingredients
                </button>

                ${createStepsHTML(recipe.steps)}
                ${createIngredientsHTML(recipe.ingredients)}
            </div>
        `;
    };

    const renderRecipes = () => {
        recipeContainer.innerHTML =
            recipes.map(createRecipeCard).join("");
    };

    // ==========================
    // EVENT DELEGATION
    // ==========================
    const handleToggleClick = (e) => {
        const button = e.target.closest(".toggle-btn");
        if (!button) return;

        const card = button.closest(".recipe-card");
        const toggleType = button.dataset.toggle;

        const container = card.querySelector(
            `.${toggleType}-container`
        );

        container.classList.toggle("visible");

        if (container.classList.contains("visible")) {
            button.textContent =
                toggleType === "steps"
                    ? "Hide Steps"
                    : "Hide Ingredients";
        } else {
            button.textContent =
                toggleType === "steps"
                    ? "Show Steps"
                    : "Show Ingredients";
        }
    };

    const setupEventListeners = () => {
        recipeContainer.addEventListener("click", handleToggleClick);
        console.log("Event listeners attached!");
    };

    // ==========================
    // PUBLIC METHOD
    // ==========================
    const init = () => {
        renderRecipes();
        setupEventListeners();
        console.log("RecipeApp ready!");
    };

    return {
        init
    };

})();

document.addEventListener("DOMContentLoaded", RecipeApp.init);
