import { User } from "./user.class";
import Cropper from "cropperjs";

export class Utils {
    static loadImage(event: Event, image: HTMLImageElement): void {
        let file: File = (event.target as HTMLInputElement).files[0];
        let reader = new FileReader();
        if (file) reader.readAsDataURL(file);

        reader.addEventListener('load', e => {
            image.src = reader.result.toString();
         
           image.addEventListener('change',()=>{})
        });


    }

    static loadImageCrop(event: Event, image: HTMLImageElement, cropper:Cropper,btnCrop:HTMLButtonElement, photo:HTMLImageElement): void {
        let file: File = (event.target as HTMLInputElement).files[0];
        let reader = new FileReader();
        if (file) reader.readAsDataURL(file);
    
        reader.addEventListener('load', e => {
            image.src = reader.result.toString();
         
            
            cropper = new Cropper(image, {
                aspectRatio: 1,
                center: true,
                viewMode:3,
                dragMode: "crop",
            
                minContainerWidth: 200
            });

            btnCrop.addEventListener('click', (e)=>{
                e.preventDefault();
                let result:HTMLCanvasElement = cropper.getCroppedCanvas();
                if(result){
                    result.toBlob(e=>{
                        let reader : FileReader = new FileReader();
                        reader.readAsDataURL(e);
            
                        reader.addEventListener('load',()=>{
                            photo.src = reader.result.toString();
                            image.src="";
                            image.classList.add('d-none');
                            cropper.destroy();
                            cropper.disable();
                        })
                    })
                }
        
               
            })
        });


    }
   


}