import React, { useState, type ReactNode } from 'react';
import '../assets/style/Foodcard.css';
import { useNavigate } from "react-router-dom";

type Meal = {
  strCategory: ReactNode;
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

type HeartIconProps = {
  filled: boolean;
  onClick?: (e: React.MouseEvent) => void;
};


const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const saveFavorites = (ids: string[]) => {
  localStorage.setItem("favorites", JSON.stringify(ids));
};




const HeartIcon: React.FC<HeartIconProps> = ({ filled, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "red" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      className="w-6 h-6 cursor-pointer transition-all duration-300 hover:scale-110"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.716-4.35-9.428-7.062C.86 12.226 1.12 8.91 3.343 6.686a4.5 4.5 0 016.364 0L12 8.98l2.293-2.293a4.5 4.5 0 016.364 6.364C18.716 16.65 12 21 12 21z"
      />
    </svg>
  );
};

const FoodCard = ({ meal }: { meal: Meal }) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const handleClick = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

 const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const favs = getFavorites();

    let updatedFavs;

    if (favs.includes(meal.idMeal)) {
      updatedFavs = favs.filter((id) => id !== meal.idMeal);
      setIsFav(false);
    } else {
      updatedFavs = [...favs, meal.idMeal];
      setIsFav(true);
    }

    saveFavorites(updatedFavs);
  };

  return (
    <div className="food-card relative" onClick={handleClick}>
      
      <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
        <HeartIcon filled={isFav} onClick={handleFavClick} />
      </div>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="food-image"
      />

<div className="food-info">
  <div className="flex items-center justify-between">
    <h3 className="food-name">{meal.strMeal}</h3>

    {/* veg / non-veg icon */}
    <span className="text-lg">
      {meal.strCategory === "Vegetarian" ? "" : ""}
    </span>
  </div>

  <p className="food-category">
    Category: {meal.strCategory}
  </p>
</div>
    </div>
  );
};

export default FoodCard;