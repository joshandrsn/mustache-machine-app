import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WebcamModule} from 'ngx-webcam';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {WebcamComponent} from './webcam/webcam.component';
import {FacialRecognitionComponent} from './facial-recognition/facial-recognition.component';
import {webcamReducer} from "./display.reducer";

@NgModule({
    declarations: [
        AppComponent,
        WebcamComponent,
        FacialRecognitionComponent
    ],
    imports: [
        BrowserModule,
        WebcamModule,
        StoreModule.forRoot({webcamR: webcamReducer})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
