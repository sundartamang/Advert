export interface Channel {
    id : string;
    name : string;
    email : string;
    channel_id : string;
    maximum_bid_price : string;
    budget : string;
    image : string;
    type : string;
    user : string;
}

export interface ChannelRootModel {
    status: boolean;
    message: String;
    data: Channel[];
    count: number;
}
