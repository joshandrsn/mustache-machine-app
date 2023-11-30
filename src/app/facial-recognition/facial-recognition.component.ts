import {Component, OnInit} from '@angular/core';

import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import * as mobilenet from '@tensorflow-models/mobilenet';

declare const require: any;

@Component({
  selector: 'app-facial-recognition',
  templateUrl: './facial-recognition.component.html',
  styleUrls: ['./facial-recognition.component.css']
})
export class FacialRecognitionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadFaceApi();
  }

  async loadFaceApi() {
    //TODO see if I can preload some of these libraries for better speed
    // await tfc.ready();????
  }

  public async triggerDetection(): Promise<void> {
    const img = <HTMLImageElement>document.getElementById('capturedImage');

    this.attemptMobilenetPredictions(img);

    // TODO why is this needed to prevent a "backend registry error"???
    const tensor = tf.browser.fromPixels(img);

    const detector = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        {
          runtime: 'tfjs',
          maxFaces: 3,
          modelType: "full"
        });

    const faces = await detector.estimateFaces(img);

    if (faces) {
      console.log("faces: " + JSON.stringify(faces));
    } else {
      console.error("faces not found");
    }

    this.setFacePaintImage(faces, img);
  }

  private setFacePaintImage(faces: faceDetection.Face[], img: HTMLImageElement): void {
    const canvas = <HTMLCanvasElement>document.getElementById(('facePaintImage'));
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      faces.forEach(face => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(face.box.xMin, face.box.yMin, face.box.width, face.box.height);

        ctx.fillStyle = 'blue';
        face.keypoints.forEach(keypoint => {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    } else {
      console.error("ctx not found");
    }
  }

  private async attemptMobilenetPredictions(img: HTMLImageElement): Promise<void> {
    const model = await mobilenet.load();

    const predictions = await model.classify(img);

    console.log('Predictions: ');
    console.log(predictions);
  }
}
