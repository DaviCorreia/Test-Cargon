export interface Product {
    name: string,
    price: number,
    image_url: string,
    details?: string,
    sport?: string
}

export interface ProductInCart extends Product {
    quantity: number
}

export interface ProductFetchResponse {
    data: {
        Product: Product
    }
}