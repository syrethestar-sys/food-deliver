import { Menu } from "./_features/menu";

const HERO_IMAGE =
  "https://res.cloudinary.com/crbcsumf/image/upload/f_auto,q_auto,w_1440/food-delivery/site/yf9stc2adbyjzbr7zvrr.png";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1000";

async function getCategories() {
  const res = await fetch(`${API_URL}/food-category/get`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.foodCategory ?? [];
}
async function getFoods() {
  const res = await fetch(`${API_URL}/food/get`, {
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
        <img
          src={HERO_IMAGE}
          alt="Today's offer"
          className="w-full rounded-2xl object-cover"
        />
      </section>

      <Menu categories={categories} dishes={dishes} />
    </div>
  );
}
