export interface User {
    customerId : string;
    name : string;
}

export interface UserRootModel {
    status: boolean;
    message: String;
    data: User[];
    count: number;
}
