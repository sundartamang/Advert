export interface Auth {
    username : string;
    password : string;
    app : string;
}

export interface AuthRootModel {
    status: boolean;
    message: String;
    data: Auth[];
    count: number;
}
