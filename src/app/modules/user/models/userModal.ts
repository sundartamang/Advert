export interface User {
    id : string;
    name : string;
    email : string;
}

export interface UserRootModel {
    status: boolean;
    message: String;
    data: User[];
    count: number;
}
