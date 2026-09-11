import { FoodCard } from "../_components/food-card";

export function FoodGrid({ dishes = [], onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <FoodCard key={dish.id} dish={dish} onSelect={onSelect} />
      ))}
    </div>
  );
}
