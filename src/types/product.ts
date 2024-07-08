export interface Product {
    name: string,
    price: number,
    image_url: string,
    details?: string,
    id: string,
    sport?: string
}

export interface ProductInCart extends Product {
    id: string
    quantity: number
}

export interface ProductFetchResponse {
    data: {
        Product: Product
    }
}