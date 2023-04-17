import { AxiosError } from "axios";
import api from "../api/Base";
import Product from "../models/Product";

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/products");

    const productsList: Product[] = data.products.map(
      (product: Product) => new Product(product)
    );

    return productsList;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      alert("Failed in fetching products");
    } else {
      console.log("Unexpected error", error);
    }

    return Promise.reject(error);
  }
};

export const getCategories = async () => {
  try {
    const { data } = await api.get("products/categories");

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      alert("Failed in fetching categories");
    } else {
      console.log("Unexpected error", error);
    }

    return Promise.reject(error);
  }
};

export const getProductByCategory = async (category: string) => {
  try {
    const { data } = await api.get(`/products/category/${category}`);
    const productsByCategoryList: Product[] = data.products.map(
      (product: Product) => new Product(product)
    );

    return productsByCategoryList;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      alert(`Failed in fetching data in ${category} category`);
    } else {
      console.log("Unexpected error", error);
    }

    return Promise.reject(error);
  }
};

export const getProductByQuery = async (query: string) => {
  try {
    const { data } = await api.get(`products/search?${query}`);
    const productsByQueryList: Product[] = data.products.map(
      (product: Product) => new Product(product)
    );

    return productsByQueryList;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      alert("failed in fetching data");
    } else {
      console.log("Unexpected error", error);
    }
    return Promise.reject(error);
  }
};

export const getProductById = async (id: any) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    const productByID: Product = new Product(data);

    return productByID;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      alert(`Failed in fetching product with id ${id}`);
    } else {
      console.log("Unexpected error", error);
    }
    return Promise.reject(error);
  }
};

export const addNewProduct = async (newProduct: Product) => {
  try {
    const response = await api.post("/products/add", newProduct);
    alert("product added");
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);

    return Promise.reject("Failed in adding product");
  }
};

export const deleteProduct = async (id: any) => {
  try {
    const { data } = await api.delete(`/products/${id}`);

    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject("Failed in deleting product");
  }
};
