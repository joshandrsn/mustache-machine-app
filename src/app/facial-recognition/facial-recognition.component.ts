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
  }

  public async triggerDetection(): Promise<void> {
    //TODO pull from @ngrx/store
    const img = <HTMLImageElement>document.getElementById('capturedImage');

    // this seems to be needed to prevent a "backend registry error", however, I'm not using the value and it is rather expensive
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

    //TODO using Mobilenet to get predictions out of the uploaded image, need to replace with a better library
    // that detects facial features.  An open market Tensorflow.js model does not seem to be available, will need
    // to train a model and upload it
    await this.attemptMobilenetPredictions(img);
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

    this.printInfoToTable(predictions);
  }

  private printInfoToTable(predictions: Array<{ className: string; probability: number }>): void {
    const table = document.createElement('table');
    const headerRow = table.insertRow(0);
    const header1 = document.createElement('th');
    const header2 = document.createElement('th');

    header1.textContent = 'Class Name';
    header2.textContent = 'Probability';

    headerRow.appendChild(header1);
    headerRow.appendChild(header2);

    predictions.forEach(prediction => {
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      cell1.textContent = prediction.className;
      cell2.textContent = prediction.probability.toString();
    });

    const containerElement = document.getElementById('tableContainer');

    if (containerElement) {
      containerElement.appendChild(table);
    } else {
      console.error('Container element not found.');
    }
  }

}
