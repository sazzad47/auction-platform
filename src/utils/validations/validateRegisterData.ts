import { RegisterData } from '../../models/register';
import { validateEmail } from './validateEmail';

export const validateRegisterData = ({ data }: { data: RegisterData }): string | null => {
    const { email, password, confirmPassword } = data;
    let errMsg: string | null = null;

    if (!email) {
        errMsg = 'Please add your email.';
    } else if (!validateEmail(email)) {
        errMsg = 'Email format is incorrect.';
    }

    if (!errMsg && (!password || password.length < 6)) {
        errMsg = 'Please add a valid password (at least 6 characters).';
    }

    if (!errMsg && password !== confirmPassword) {
        errMsg = 'Confirm password did not match.';
    }

    return errMsg;
};
