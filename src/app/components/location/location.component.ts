import { Component, OnInit } from '@angular/core';
import NavigatorHelper from './libs/helpers/navigator.helper';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public position: any = {};


  constructor() { }

  ngOnInit(): void {
  }

  getLocation(){
    /*NavigatorHelper.getLocation().then(pos => {
      console.log('pos: ',pos)
    }).catch(error => {
      console.log('err: ',error)
    })*/

    NavigatorHelper.getLocationCallBack(pos => {
      console.log(pos)
      this.position = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
    },
      error => {console.log(error);
    }); 
  }

  start(video: HTMLVideoElement){
    NavigatorHelper.startRecord(video);
  }

  startAudio(audio: HTMLAudioElement){
    NavigatorHelper.startAudio(audio);
  }
}
