export interface Channel {
    id : string;
    name : string;
    channel_id : string;
    max_price : string;
    click_through_url: string;
    start_time : string;
    end_time : string;
}

export interface ChannelRootModel {
    status: boolean;
    message: String;
    data: Channel[];
    count: number;
}
