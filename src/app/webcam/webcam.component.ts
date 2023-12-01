import {Component, OnInit, ViewChild} from '@angular/core';
import {WebcamImage, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from "rxjs";
import {Store} from '@ngrx/store';
import {captureImage, startCamera, stopCamera} from '../display.actions';
import {WebcamState} from "../display.state";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  @ViewChild('webcam') webcamElement: any;
  public videoOptions: MediaTrackConstraints = {};
  private trigger: Subject<void> = new Subject<void>();

  webCam$ : Observable<WebcamState>;

  constructor(private store: Store<{webcamR: WebcamState}>) {
    this.webCam$ = store.select('webcamR');
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      console.log(mediaDevices);
    });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.debug('received webcam image', webcamImage);
    this.store.dispatch(captureImage({payload: webcamImage.imageAsDataUrl}));
  }

  startCamera() {
    this.store.dispatch(startCamera());
  }

  stopCamera() {
    this.store.dispatch(stopCamera());
  }
}
