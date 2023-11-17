import Swal from 'sweetalert2';

export function showLoader(msg: string) {
    Swal.fire({
        title: msg,
    });
    Swal.showLoading();
}
