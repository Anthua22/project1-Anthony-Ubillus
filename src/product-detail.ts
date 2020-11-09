import * as mapboxgl from "mapbox-gl";
import Swal from "sweetalert2";
import { Product } from "./classes/product.class";
import { MAPBOX_TOKEN } from "./constants";

let id: number;
let container: HTMLDivElement;
let map: HTMLDivElement;
let mapBox: mapboxgl.Map;

(mapboxgl as any).accessToken = MAPBOX_TOKEN;

document.addEventListener('DOMContentLoaded', e => {
    id = parseInt(location.search.split("=")[1]);
    if (!id) {
        location.assign("index.html");
    }
    container = document.getElementById('productContainer') as HTMLDivElement;
    map = document.getElementById('map') as HTMLDivElement;
    rescueProduct();


})

function rescueProduct(): void {
    Product.get(id).then(x => {
        let prod: Product = new Product(x.product);
        console.log(prod)
        container.appendChild(prod.toHTML());
        makeMap(prod);
        createMarker("red", prod)
    }
    ).catch(x => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: x
        });
    });

}

function makeMap(product: Product):void {
    mapBox = new mapboxgl.Map({
        container: map,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [product.owner.lng, product.owner.lat],
        zoom: 14
    })
}

function createMarker(color: string, prod: Product):void {
    new mapboxgl.Marker({ color })
        .setLngLat(new mapboxgl.LngLat(prod.owner.lng, prod.owner.lat))
        .addTo(mapBox);
}
