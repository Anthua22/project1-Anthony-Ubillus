import * as mapboxgl from "mapbox-gl";
import Swal from "sweetalert2";
import { Auth } from "./classes/auth.class";
import { User } from "./classes/user.class";
import { MAPBOX_TOKEN } from "./constants";

let containerProfile: HTMLDivElement;
let id: number;
let map: HTMLDivElement;
let mapBox: mapboxgl.Map;
let logout:HTMLElement;

(mapboxgl as any).accessToken = MAPBOX_TOKEN;

document.addEventListener('DOMContentLoaded', e => {
    containerProfile = document.getElementById('profile') as HTMLDivElement;
    map = document.getElementById('map') as HTMLDivElement;
    logout = document.getElementById('logout');
    logout.addEventListener('click',Auth.logout);
    id = parseInt(location.search.split('=')[1]);
    User.getProfile(id).then(x => {
        let user: User = new User(x.user);
        containerProfile.appendChild(user.toHTML());
        makeMap(user);
        createMarker("red", user);
    }).catch(x => {
        Swal.fire({
            icon: 'error',
            title: 'Profile Error',
            text: x
        });
    });

})

function makeMap(user: User): void {
    mapBox = new mapboxgl.Map({
        container: map,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [user.lng, user.lat],
        zoom: 14
    })
}

function createMarker(color: string, user: User): void {
    new mapboxgl.Marker({ color })
        .setLngLat(new mapboxgl.LngLat(user.lng, user.lat))
        .addTo(mapBox);
}
