import { FoodCard } from "../_components/food-card";

export function FoodGrid({ foods = [] }) {
  return (
    <div className="grid gap-4">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
