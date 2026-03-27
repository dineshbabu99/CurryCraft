import axios from 'axios';
import '../assets/style/Home.css';
import FoodCard from '../compoments/FoodCard';
import  {useState, useEffect} from 'react';
import {searchByNameUrl, filterByCategoryUrl} from '../assets/api/Urls';
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




    return (
        <>
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">Welcome to CurryCraft</h1>
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

<div className="categories mt-6 flex flex-col items-center w-full">
  <h2 className="text-xl font-semibold mb-4">Categories</h2>

 <div className="flex flex-row gap-4 overflow-x-auto px-4 items-center">

  {["Favorites", ...categories.map(c => c.strCategory)].map((cat) => (
    <span
      key={cat}
      className={`home-category ${
        activeCategory.includes(cat)
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
      {cat === "Favorites" ? "❤️ Favorites" : cat}
    </span>
  ))}

</div>
</div>     
        </div>
<div className="flex flex-wrap gap-6 justify-center mt-6">
  {loading ? (
    <p>Loading...</p>
  ) : foodList.length > 0 ? (
    foodList
      .filter((meal) => {
        if (activeCategory.length === 0) return true;

        if (activeCategory.includes("Favorites")) {
const favs = getFavorites();

return favs?.includes(meal.idMeal);  
      }

        return activeCategory.includes(meal.strCategory || "");
      })
      .map((meal) => (
        <FoodCard key={meal.idMeal} meal={meal} />
      ))
  ) : (
    <p>No results found</p>
  )}
</div>
</div>


</>
    );
}


export default Home;