import { CategoryTabs } from "./_features/category-tabs";
import { FoodGrid } from "./_features/food-grid";

export default function Home() {
  return (
    <div>
      <CategoryTabs />
      <FoodGrid />
    </div>
  );
}
