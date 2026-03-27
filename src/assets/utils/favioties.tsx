 type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
};

export const getFavorites = (): string[] => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

export const saveFavorites = (favoriteIds: string[]) => {
  localStorage.setItem("favorites", JSON.stringify(favoriteIds));
};