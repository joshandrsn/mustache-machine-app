import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { WebcamComponent } from './webcam/webcam.component';
import { FacialRecognitionComponent } from './facial-recognition/facial-recognition.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    FacialRecognitionComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
