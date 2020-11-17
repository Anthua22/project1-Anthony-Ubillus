import Swal from "sweetalert2";

export class Utils {

    static showError(x: any) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: x
        });
    }

}