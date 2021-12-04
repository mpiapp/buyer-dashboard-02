export interface IDataRowTemplates {
    _id: string;
    date: string;
    author: string;
    vendor: any;
    total_price: string;
    name: string;
    selector? : any;
}

export interface ICartPurchaseRequests {
    carts : any[];
    loading: boolean;
    error?: any;
    loading_add : boolean;
    error_add : any;
    success_add : boolean;
    message_snackbar: any;
}

export interface IProductItem {
    _id: string;
    vendor_id: string;
    vendor_name : string;
    name: string;
    SKU: string;
    slug_product: string;
    brand: string;
    images_product: any[];
    storage: any;
    dimension: any;
    sub_products: any;
    categories: string;
    measurement: string;
    author: string;
    warehouse: any;
    retail_price: number;
    sub_price_total: number;
    discount: any;
    discount_price: number;
    quantity: number;
    payment_term: any;
}