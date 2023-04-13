import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/ProductsServices";

interface CategoryProps {
  setChosenCtg: React.Dispatch<React.SetStateAction<string>>;
}

const Category = ({ setChosenCtg }: CategoryProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    let categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <ul className="category-sidebar">
        {categories.map((category) => (
          <li key={category} onClick={() => setChosenCtg(String(category))}>
            <p>{category}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
