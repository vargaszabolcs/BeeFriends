export type RootStackParamList = {
    LoginStack: LoginStackParamList;
}

export type LoginStackParamList = {
    Login: undefined;
    Signup: undefined;
}

export interface IUser {
    email: string;
    token: string;
}

export interface IStoreState {
    userData: IUser | null,
}

export type Action = {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}

export type LoginResponse = {
    token: string;
    error?: string;
}
