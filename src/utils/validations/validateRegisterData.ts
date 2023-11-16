import { RegisterData } from './../../models/register';
import { createToast } from '../toast';
import { validateEmail } from './validateEmail';

const showErrorToast = (message: string): boolean => {
    createToast(message, { type: 'info' });
    return false;
};

export const validateForm = ({ data }: { data: RegisterData }): boolean => {
    const { email, password, confirmPassword } = data;

    if (!email || !validateEmail(email)) {
        return showErrorToast(!email ? 'Please enter email!' : 'Invalid Email!');
    }

    if (!password) {
        return showErrorToast('Please enter password!');
    }

    if (password.length < 6) {
        return showErrorToast('Password must be at least 6 characters long.');
    }

    if (!confirmPassword) {
        return showErrorToast('Please confirm password!');
    }

    if (password !== confirmPassword) {
        return showErrorToast('Password did not match!');
    }

    return true;
};
