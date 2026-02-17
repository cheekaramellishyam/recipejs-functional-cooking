// ============================================
// RECIPE DATA
// ============================================

const recipes = [
    { title: "Pasta", difficulty: "easy", time: 20 },
    { title: "Biryani", difficulty: "hard", time: 60 },
    { title: "Salad", difficulty: "easy", time: 10 },
    { title: "Burger", difficulty: "medium", time: 25 },
    { title: "Fried Rice", difficulty: "medium", time: 30 },
    { title: "Cake", difficulty: "hard", time: 50 },
    { title: "Omelette", difficulty: "easy", time: 5 },
    { title: "Soup", difficulty: "easy", time: 15 }
];

// ============================================
// STATE
// ============================================

let currentFilter = 'all';
let currentSort = 'none';

// ============================================
// DOM REFERENCES
// ============================================

const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');

// ============================================
// RENDER FUNCTION
// ============================================

const renderRecipes = (data) => {
    recipeContainer.innerHTML = "";

    data.forEach(recipe => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.margin = "10px 0";

        div.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Difficulty: ${recipe.difficulty}</p>
            <p>Time: ${recipe.time} mins</p>
        `;

        recipeContainer.appendChild(div);
    });
};

// ============================================
// FILTER FUNCTIONS
// ============================================

const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time <= maxTime);
};

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case 'easy':
            return filterByDifficulty(recipes, 'easy');
        case 'medium':
            return filterByDifficulty(recipes, 'medium');
        case 'hard':
            return filterByDifficulty(recipes, 'hard');
        case 'quick':
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};

// ============================================
// SORT FUNCTIONS
// ============================================

const sortByName = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.time - b.time
    );
};

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case 'name':
            return sortByName(recipes);
        case 'time':
            return sortByTime(recipes);
        default:
            return recipes;
    }
};

// ============================================
// UPDATE DISPLAY
// ============================================

const updateDisplay = () => {
    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);
};

// ============================================
// ACTIVE BUTTON STYLE
// ============================================

const updateActiveButtons = () => {

    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.sort === currentSort) {
            btn.classList.add('active');
        }
    });
};

// ============================================
// EVENT HANDLERS
// ============================================

const handleFilterClick = (event) => {
    currentFilter = event.target.dataset.filter;
    updateActiveButtons();
    updateDisplay();
};

const handleSortClick = (event) => {
    currentSort = event.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
};

// ============================================
// EVENT LISTENERS
// ============================================

const setupEventListeners = () => {

    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    sortButtons.forEach(btn => {
        btn.addEventListener('click', handleSortClick);
    });

};

// ============================================
// INITIALIZATION
// ============================================

setupEventListeners();
updateDisplay();
