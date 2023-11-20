import { DepositData } from "./deposit";

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignupResponse {
    data: {
        status: number;
        statusCode: number;
        message: string;
        data: {
            token: string;
            user: {
                id: string;
                email: string;
                deposit: DepositData;
                bids: string[];
            };
        };
    };
}
