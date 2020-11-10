export class Utils{
    static loadImage(event: Event, image:HTMLImageElement): void {
        let file: File = (event.target as HTMLInputElement).files[0];
        let reader = new FileReader();
    
        if (file) reader.readAsDataURL(file);
    
        reader.addEventListener('load', e => {
            image.src = reader.result.toString();
        });
    }
    
}