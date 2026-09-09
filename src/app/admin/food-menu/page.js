import { CategoryChips } from "./_features/category-chips";
import { DishGrid } from "./_features/dish-grid";

async function getCategories() {
  const res = await fetch("http://localhost:1000/food-category/get", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data.foodCategory);
  return data.foodCategory ?? [];
}
async function getFoods() {
  const res = await fetch("http://localhost:1000/food/get", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.foods ?? [];
}
const dishSections = [
  {
    category: "Salads",
    dishes: [
      {
        name: "Grilled Chicken cobb salad",
        price: "$12.99",
        ingredients:
          "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
        image: "https://images.unsplash.com/photo-...",
      },
    ],
  },
  {
    category: "Pizzas",
    dishes: [],
  },
];

export default async function FoodMenuPage() {
  const [categories, foods] = await Promise.all([getCategories(), getFoods()]);

  const countFor = (id) => foods.filter((f) => f.category?._id === id).length;

  const chips = categories.map((c) => ({
    id: c._id,
    label: c.categoryName,
    count: countFor(c._id),
  }));
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <CategoryChips chips={chips} totalCount={foods.length} />
      <DishGrid sections={dishSections} />
    </div>
  );
}
