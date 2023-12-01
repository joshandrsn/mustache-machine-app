import {createAction, props} from '@ngrx/store';

export const startCamera = createAction('[Webcam] Start Camera');
export const stopCamera = createAction('[Webcam] Stop Camera');
export const captureImage = createAction('[Webcam] Take Picture', props<{ payload: string }>());
