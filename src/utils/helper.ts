import Swal from 'sweetalert2';

export function showLoader() {
    Swal.fire({
        title: 'Processing...',
    });
    Swal.showLoading();
}
