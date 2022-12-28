export interface Channel {
    channelId : string;
    name : string;
    parent : string;
}

export interface ChannelRootModel {
    status: boolean;
    message: String;
    data: Channel[];
    count: number;
}
