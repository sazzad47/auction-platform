import Swal from 'sweetalert2';

type ToastType = 'error' | 'success' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface ToastOptions {
    type?: ToastType;
    position?: ToastPosition;
}

export const createToast = async (
    message: string,
    { type = 'error', position = 'top-right' }: ToastOptions = {},
): Promise<void> => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        iconColor: type,
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    await Toast.fire({
        icon: type,
        title: message,
    });
};
