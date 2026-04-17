const FAVORITES_KEY = "favorites";


export const getFavorites = (): string[] => {
  try {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
  } catch (error) {
    console.error("Error reading favorites:", error);
    return [];
  }
};

export const saveFavorites = (favoriteIds: string[]) => {
  try {
    const unique = Array.from(new Set(favoriteIds)); // remove duplicates
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(unique));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

export const toggleFavorite = (id: string): boolean => {
  const favs = getFavorites();

  let updated: string[];

  if (favs.includes(id)) {
    updated = favs.filter((fav) => fav !== id);
  } else {
    updated = [...favs, id];
  }

  saveFavorites(updated);
  return updated.includes(id); // return new state
};


export const isFavorite = (id: string): boolean => {
  return getFavorites().includes(id);
};