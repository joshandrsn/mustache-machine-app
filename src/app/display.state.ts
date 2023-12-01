import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface WebcamState {
    isCameraOn: boolean;
    currentImage: string;
}

export const initialWebcamState: WebcamState = {
    isCameraOn: true,
    currentImage: "",
};

export const selectWebcamState = createFeatureSelector<WebcamState>('webcam');

export const selectCurrentImage = createSelector(
    selectWebcamState,
    (state: WebcamState) => state.currentImage
);