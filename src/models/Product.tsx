export default class Product{
    id?: string
    title: string
    desc: string
    price: number
    rating: number
    stock: number
    brand: string
    category: string
    image: string

    constructor(api: any){
        this.id= api['id']
        this.title= api['title']
        this.desc= api['description']
        this.price= api['price']
        this.rating= api['rating']
        this.stock= api['stock']
        this.brand= api['brand']
        this.category= api['category']
        this.image= api['thumbnail']
    }
}