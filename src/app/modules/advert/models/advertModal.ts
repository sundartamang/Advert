export interface Advert {
    id: string;
    name: string;
    // channelId : string;
    channel_id : string;
    // maxPrice: number;
    max_price : number
    // customerId: string;
    customer_id : string;
}

export interface AdvertRootModel {
    status: boolean;
    message: String;
    data: Advert[];
    count: number;
}
