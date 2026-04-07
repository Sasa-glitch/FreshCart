export interface ProductType {
    sold?: number;
    images: string[];
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
    priceAfterDiscount?: number;
    availableColors?: string[];
}

export interface SingleProductType extends ProductType {
    __v: number;
    reviews: Review[];
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Review {
    _id: string;
    review: string;
    rating: number;
    product: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface User {
    _id: string;
    name: string;
    email?: string;
    phone?: number;
}

// cart types

export interface CartResponse {
    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string | null;
    data: CartData;
}

export interface CartData {
    _id?: string;
    cartOwner?: string;
    products: CartProduct[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    totalCartPrice: number;
}

export interface CartProduct {
    count: number;
    _id: string;
    product: CartProductDetail;
    price: number;
}

export interface CartProductDetail {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    id: string;
}

// order types
export interface CashOrderDetails {
    shippingAddress: ShippingAddress;}

export interface CashOrderResType {
    status: string;
    message: string;
    user: User;
    pricing: Pricing;
    data: CashOrderData;
}

export interface Pricing {
    cartPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
}

export interface CashOrderData {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: User;
    cartItems: CartProduct[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
    paidAt?: string
}

export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
        postalCode?: string;

}

// visa orders

export interface CardOrderResType {
    status: string;
    session: PaymentSession;
}

export interface PaymentSession {
    url: string,
    success_url: string;
    cancel_url: string;
}

