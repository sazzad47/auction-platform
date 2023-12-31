export interface LoginData {
    email: string;
    password: string;
}

interface loginResponse {
    data: {
        token: string;
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            birthdayDate: Date;
        }

    }
}

export default loginResponse;