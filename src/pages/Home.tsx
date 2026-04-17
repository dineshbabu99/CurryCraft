import axios from 'axios';
import '../assets/style/Home.css';
import FoodCard from '../compoments/FoodCard';
import { useState, useEffect } from 'react';
import { searchByNameUrl, filterByCategoryUrl } from '../assets/api/Urls';
import { getFavorites } from '../assets/utils/favioties';


const Home = () => {
  type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
  };

  type Category = {
    strCategory: string;
  };

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("a");
  const [foodList, setFoodList] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const [isFavorites, setIsFavorites] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearch) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `${searchByNameUrl}${debouncedSearch}`
        );

        setFoodList(res.data.meals || []);
      } catch (err) {
        console.error(err);
        setFoodList([]);
      }

      setLoading(false);
    };


    fetchData();

  }, [debouncedSearch]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(filterByCategoryUrl);
        setCategories(res.data.meals || []);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };

    fetchCat();

  }, []);

const favs = getFavorites();

const filteredList = foodList.filter((meal) => {
  if (activeCategory.length === 0) return true;

  const isFavSelected = activeCategory.includes("Favorites");
  const isCategorySelected = activeCategory.some(
    (cat) => cat !== "Favorites"
  );

  const matchFav = !isFavSelected || favs.includes(meal.idMeal);
  const matchCategory =
    !isCategorySelected ||
    activeCategory.includes(meal.strCategory || "");

  return matchFav && matchCategory;
});


  return (
    <>
      <div className="home-container">
      <header style={{
          background: "#1a1208", color: "#fff", padding: "0 24px",
          position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 4px 30px rgba(0,0,0,.3)"
        }}>      
              
              <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>🍽</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", background: "linear-gradient(90deg, #f5d6b0, #e85d4a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CurryCraft</span>
            </div>
        <div> 
     <nav className='nav-bar'> 
<button
  className={activeCategory.length === 0 ? "active" : ""}
  onClick={() => setActiveCategory([])}
>
  All Recipes
</button>

<button
  className={activeCategory.includes("Favorites") ? "active" : ""}
  onClick={() => setActiveCategory(["Favorites"])}
>
  Favorites
</button>
</nav>
        </div>

            </div>
        </header>
        <div className="home-content">
          <div className="relative mx-auto max-w-sm mt-5">
            <div className="absolute left-3 inset-y-0 flex items-center text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M21 3C11.6545 3 4 10.6545 4 20C4 29.3455 11.6545 37 21 37C24.7013 37 28.1274 35.7867 30.9277 33.7559L44.0859 46.9141L46.9141 44.0859L33.875 31.0469C36.4368 28.0683 38 24.2102 38 20C38 10.6545 30.3455 3 21 3ZM21 5C29.2545 5 36 11.7455 36 20C36 28.2545 29.2545 35 21 35C12.7455 35 6 28.2545 6 20C6 11.7455 12.7455 5 21 5Z" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 rounded-xl pl-11 pr-4 text-sm bg-slate-50 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="categories">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>

            <div className="flex flex-row gap-4 overflow-x-auto px-4 items-center">

              {[...categories.map(c => c.strCategory)].map((cat) => (
                <span
                  key={cat}
                  className={`home-category ${activeCategory.includes(cat)
                      ? "bg-green-200"
                      : "bg-gray-200"
                    }`}
                  onClick={() => {
                    const activeCat = [...activeCategory];
                    const index = activeCat.indexOf(cat);

                    if (index === -1) {
                      activeCat.push(cat);
                    } else {
                      activeCat.splice(index, 1);
                    }

                    setActiveCategory(activeCat);
                  }}
                >
                  {cat}
                </span>
              ))}

            </div>
            {activeCategory.length > 0 && (
  <p className="text-sm text-gray-500 mt-2 text-center">
    Filters: {activeCategory.join(", ")}
  </p>
)}
          </div>
        </div>
       <div className="food-grid mt-6">
  {loading ? (
    <p>Loading...</p>
  ) : filteredList.length > 0 ? (
    filteredList.map((meal) => (
      <FoodCard key={meal.idMeal} meal={meal} />
    ))
  ) : (
    <p className="empty-text">
      {isFavorites
        ? "❤️ No favorites yet. Add some!"
        : "😕 No recipes found"}
    </p>
  )}
</div>
      </div>


    </>
  );
}


export default Home;