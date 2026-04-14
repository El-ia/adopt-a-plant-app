import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAGfSDUYS_mEyI2NyzEmkK_RrXsO5YF2gk",
  authDomain: "adopt-a-plant-app.firebaseapp.com",
  projectId: "adopt-a-plant-app",
  storageBucket: "adopt-a-plant-app.firebasestorage.app",
  messagingSenderId: "1000816704157",
  appId: "1:1000816704157:web:51a98694c37c87434c3274"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
  ]
};