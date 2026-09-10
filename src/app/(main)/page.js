import { Menu } from "./_features/menu";
import Image from "next/image";
import menuPicture from "@/components/menuPicture.jpg";

async function getCategories() {
  const res = await fetch("http://localhost:1000/food-category/get", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.foodCategory ?? [];
}
async function getFoods() {
  const res = await fetch("http://localhost:1000/food/get", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.foods ?? [];
}

export default async function Home() {
  const [categories, foods] = await Promise.all([getCategories(), getFoods()]);

  const dishes = foods.map((f) => ({
    id: f._id,
    name: f.foodName,
    price: f.price,
    image: f.image,
    ingredients: Array.isArray(f.ingredients)
      ? f.ingredients.join(", ")
      : f.ingredients,
    categoryId: f.category?._id,
  }));
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <Image
          src={menuPicture}
          alt="Today's offer"
          className="w-full rounded-2xl object-cover"
          priority
        />
      </section>

      <Menu categories={categories} dishes={dishes} />
    </div>
  );
}
