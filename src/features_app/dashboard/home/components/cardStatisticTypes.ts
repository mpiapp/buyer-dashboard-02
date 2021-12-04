export interface IStatistic {
    value: number;
    label: string;
    currency : boolean;
    background? : string;
    status?: boolean;
}

export interface INewestProduct {
    _id: string;
    date: string;
    company: string;
    payment_terms : string;
    selector? : any;
    total_item: number,
    total_price: number,
}