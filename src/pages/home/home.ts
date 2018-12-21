import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  LatLng,
  Marker
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    })
  }
  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 48.8584,
          lng: 2.2945
        },
        zoom: 1,
        tilt: 0
      }
    };
    this.map = GoogleMaps.create(element, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        var markerCluster = this.map.addMarkerCluster({
          markers: this.dummyData(),
          icons: [
              {min: 2, max: 100, url: "./assets/imgs/blue.png", anchor: {x: 16, y: 16}},
              {min: 100, max: 1000, url: "./assets/imgs/yellow.png", anchor: {x: 16, y: 16}},
              {min: 1000, max: 2000, url: "./assets/imgs/purple.png", anchor: {x: 24, y: 24}},
              {min: 2000, url: "./assets/imgs/red.png",anchor: {x: 32,y: 32}}
          ]
        }).then((markerCluster) => {
          markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((cluster) => {
            cluster[1].setTitle(cluster[1].get("name"));
            cluster[1].on(GoogleMapsEvent.INFO_CLICK).subscribe((info) => {
              alert('Work');
            });
          });
        });

      });
  }

  dummyData(){
    return [
      {
        "position": {
          "lat": 48.858370,
          "lng": 2.294481
        },
        "name": "Tour Eiffel"
      },
      {
        "position": {
          "lat": 48.858370,
          "lng": 2.694481
        },
        "name": "One side of Tour Eiffel"
      }
    ]
  }
}
