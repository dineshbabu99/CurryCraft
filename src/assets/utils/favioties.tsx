import React from "react";


export const getFavorites = (): Meal[] => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

export const saveFavorites = (meals: Meal[]) => {
  localStorage.setItem("favorites", JSON.stringify(meals));
};