import {Component, OnInit, ViewChild} from '@angular/core';
import {WebcamImage, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  @ViewChild('webcam') webcamElement: any;
  private _webcamImage: WebcamImage | undefined;
  public videoOptions: MediaTrackConstraints = {};
  showWebcam = true; // Initially show the webcam

  private trigger: Subject<void> = new Subject<void>();

  constructor() {
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
    this._webcamImage = webcamImage;
  }

  public get webcamImage(): WebcamImage | undefined {
    return this._webcamImage;
  }

  toggleWebcam() {
    this.showWebcam = !this.showWebcam;
  }
}
