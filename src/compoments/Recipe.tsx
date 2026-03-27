import '../assets/style/Recipe.css';
// const Recipe = () => {
//   return (
//     <>
//             <div className="Recipe-card" >
//         <div className="Recipe-info">
//             <h3 className="Recipe-name">Delicious Curry</h3>
//         <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636" alt="Curry Dish" className="Recipe-image" />
//             <p className="Recipe-category"><span >Category:</span> Main Course</p>
//             <p className="Recipe-description">A flavorful and spicy curry dish made with fresh ingredients.</p>
//             <p className="Recipe-ingredients">Ingredients</p>
//             <ul className="Recipe-ingredient-list">
//                 <li>1 lb chicken breast, diced</li>
//                 <li>2 tbsp curry powder</li>
//                 <li>1 onion, chopped</li>
//                 <li>2 cloves garlic, minced</li>
//                 <li>1 can diced tomatoes</li>
//                 <li>1 cup coconut milk</li>
//                 <li>Salt and pepper to taste</li>
//             </ul>
//             <p className="Recipe-instructions">Instructions: 1. Sauté onions and garlic. 2. Add chicken and cook until browned. 3. Add tomatoes and spices, simmer until chicken is cooked through.</p>
//             <div className="Recipe-actions">
//                 <button className="Recipe-button">Save Recipe</button>
//                 <button className="Recipe-button">Share Recipe</button>
//             </div>
            
//         </div>
//         </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  [key: string]: any; // for ingredients (important)
};

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeal(res.data.meals[0]);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (!meal) return <p className="text-center mt-10">Loading...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* 🔙 Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>

      <div className="Recipe-card">

        <h3 className="Recipe-name">{meal.strMeal}</h3>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />

        <p className="Recipe-category">
          <span className="font-semibold">Category:</span> {meal.strCategory}
        </p>

        <p className="Recipe-description mt-3">
          {meal.strInstructions.slice(0, 150)}...
        </p>

        {/* 🧾 Ingredients */}
        <p className="Recipe-ingredients font-bold mt-4">Ingredients</p>

        <ul className="list-disc pl-6">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* 📜 Instructions */}
        <p className="Recipe-instructions mt-4">
          {meal.strInstructions}
        </p>

        <div className="Recipe-actions mt-4">
          <button className="Recipe-button">Save Recipe</button>
          {/* <button className="Recipe-button">Share Recipe</button> */}
        </div>

      </div>
    </div>
  );
};

export default Recipe;

