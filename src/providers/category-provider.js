"use client";

import { useRouter } from "next/navigation";
import { server } from "@/app/api/api";
import { createContext, useContext } from "react";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const router = useRouter();

  const create = async (name) => {
    await server.post("/food-category/create", { name });
    router.refresh();
  };

  const remove = async (id) => {
    await server.delete("/food-category/delete", {data:{id}});
    router.refresh();
  };
  return (
    <CategoryContext.Provider value={{ create, remove }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
