import api from '../api/Base'
import Product from '../models/Product'

type getAllProductsType = {
    products: Product[]
}

type getAllCategoriesType = {
    categories: string[]
}

type getProductByIdType = {
    product: Product
}

export const getAllProducts = async (): Promise<getAllProductsType> => {
    try {
        const { data } = await api.get('/products')

        const productsList: Product[] = data.products.map((product: Product) => new Product(product))

        return { products: productsList }
    } catch (error) {
        alert('Failed in fetching products')
        return Promise.reject(error)
    }
}

export const getCategories = async (): Promise<getAllCategoriesType> => {
    try {
        const { data } = await api.get('products/categories')

        return { categories: data }
    } catch (error) {
        alert('Failed in fetching categories')
        return Promise.reject(error)
    }
}

export const getProductByCategory = async (category: string):Promise<getAllProductsType> => {
    try {
        const {data} = await api.get(`/products/category/${category}`)
        const productsByCategoryList: Product[] = data.products.map((product: Product) => new Product(product))

        return { products: productsByCategoryList }
    } catch (error) {
        alert(`Failed in fetching data in ${category} category`)
        return Promise.reject(error)
    }
}

export const getProductByQuery = async (query: string):Promise<getAllProductsType> => {
    try {
        const {data} = await api.get(`products/search?${query}`)
        const productsByQueryList: Product[] = data.products.map((product: Product) => new Product(product))

        return { products: productsByQueryList }
    } catch (error) {
        alert('failed in fetching data')
        return Promise.reject(error)
    }
}

export const getProductById = async (id:string|undefined) :Promise<getProductByIdType>=> {
    try {
        const {data} = await api.get(`/products/${id}`)
        const productByID: Product = new Product(data)

        return { product: productByID }
    } catch (error) {
        alert(`Failed in fetching product with id ${id}`)
        return Promise.reject(error)
    }
}

export const addNewProduct = async (newProduct: Product) => {
    try {
        
        const response = await api.post('/products/add', newProduct)
        alert('product added')
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject('Failed in adding product')
    }
}

export const deleteProduct = async (id: any) => {
    try {
        const { data } = await api.delete(`/products/${id}`)

        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject('Failed in deleting product')
    }
}