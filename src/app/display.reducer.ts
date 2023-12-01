import {createReducer, on} from '@ngrx/store';
import * as WebcamActions from './display.actions';
import {initialWebcamState} from './display.state';

export const webcamReducer = createReducer(
    initialWebcamState,
    on(WebcamActions.startCamera, (state) => {
        console.log('Starting camera...');

        // Update the state
        return {...state, isCameraOn: true};
    }),
    on(WebcamActions.stopCamera, (state) => {
        console.log('Stopping camera...');

        // Update the state
        return {...state, isCameraOn: false};
    }),
    on(WebcamActions.captureImage, (state, {payload}) => {
        console.log('Taking picture...');

        // Update the state
        return {...state, currentImage: payload};
    }),
);
