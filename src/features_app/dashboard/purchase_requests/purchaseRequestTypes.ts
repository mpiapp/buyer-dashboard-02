export interface IDataRowPurchaseRequest {
    code_pr: string;
    createdAt: string;
    createdBy: string;
    vendors: any;
    total: number;
    lastStatus: string;
    selector? : any;
    _id : string
}

export interface ICartPurchaseRequests {
    carts : any[];
    loading: boolean;
    error?: any;
    loading_add : boolean;
    error_add : any;
    success_add : boolean;
    message_snackbar: any;
    success_save: boolean;
    loading_save: boolean;
    error_save: any;
    submit : boolean,
    loading_submit : boolean,
    error_submit : any,
    success_reset : boolean
}

export interface IProductItem {
    _id: string;
    vendor_id: string;
    name: string;
    sku: string;
    slug: string;
    brand: string;
    images_product: any[];
    storage: any;
    dimension: any;
    sub_products: any;
    categories: string;
    measurement: string;
    warehouse: any;
    retail_price: number;
    sub_total : number;
    discount: any;
    discount_price: number;
    quantity: number;
    payment_term: any;
}

export interface IStatePurchaseRequest {
    data : any[];
    loading: boolean;
    error: any;
}