export interface Advert {
    id: string;
    name: string;
    parent_chhanel_id : string;
}

export interface AdvertRootModel {
    status: boolean;
    message: String;
    data: Advert[];
    count: number;
}
