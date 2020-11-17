import { User } from "./user.class";
import Cropper from "cropperjs";
import Swal from "sweetalert2";
import { TYPE } from "../constants";

export class Utils {

    static loadImage(event: Event, image: HTMLImageElement, cropper: Cropper, type: String): void {
        let file: File = (event.target as HTMLInputElement).files[0];
        let reader = new FileReader();
        if (file) reader.readAsDataURL(file);

        reader.addEventListener('load', e => {
            image.src = reader.result.toString();
            if (type === TYPE[1]) {
                cropper = new Cropper(image, {
                    aspectRatio: 1,
                    center: true,
                    viewMode: 3,
                    dragMode: "move"
                });
            } else {
                cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    center: true,
                    viewMode: 3,
                    dragMode: "crop"
                });
            }

        })
    }

    static showError(x: any) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: x
        });
    }

}