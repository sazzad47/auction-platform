import { LoginData } from '../../models/login';

export const validateLoginData = ({ data }: { data: LoginData }): string | null => {
    const { email, password } = data;
    let errMsg: string | null = null;

    if (!email) {
        errMsg = 'Please enter your email.';
    }

    if (!errMsg && !password) {
        errMsg = 'Please enter your password';
    }

    return errMsg;
};
