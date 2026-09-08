import { AddDishCard } from "../_components/add-dish-card";
import { DishCard } from "../_components/dish-card";

const placeholderDishes = [
  {
    name: "Grilled Chicken cobb salad",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  },
  {
    name: "Burrata Caprese",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  },
  {
    name: "Betroot and orange salad",
    price: "$12.99",
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  },
];

export function DishSection({ name, count }) {
  return (
    <section className="rounded-2xl bg-white p-6">
      <h3 className="mb-5 text-lg font-semibold">
        {name} ({count})
      </h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AddDishCard category={name} />
        {placeholderDishes.map((dish) => (
          <DishCard
            key={dish.name}
            name={dish.name}
            price={dish.price}
            description={dish.description}
          />
        ))}
      </div>
    </section>
  );
}
