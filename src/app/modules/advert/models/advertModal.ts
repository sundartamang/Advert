export interface Advert {
    id: string;
    name: string;
    channelId : string;
    maxPrice: number;
    customerId: string;
}

export interface AdvertRootModel {
    status: boolean;
    message: String;
    data: Advert[];
    count: number;
}
