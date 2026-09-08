import { CategoryPanel } from "./_features/category-panel";
import { DishSection } from "./_features/dish-section";

const sections = [
  { name: "Salads", count: 3 },
  { name: "Pizzas", count: 5 },
];

export default function FoodMenuPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <CategoryPanel />
      {sections.map((section) => (
        <DishSection
          key={section.name}
          name={section.name}
          count={section.count}
        />
      ))}
    </div>
  );
}
