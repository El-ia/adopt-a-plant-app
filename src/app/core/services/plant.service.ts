import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({ providedIn: 'root' })
export class PlantService {
  private firestore = inject(Firestore);

  getPlants(): Observable<Plant[]> {
    const plantsCol = collection(this.firestore, 'plants');
    return collectionData(plantsCol, { idField: 'id' }) as Observable<Plant[]>;
  }

  // Call Cloud Function via HTTP directly to avoid CORS issues with onCall
  async adoptPlant(plantId: string): Promise<any> {
    const response = await fetch(
      'https://us-central1-adopt-a-plant-app.cloudfunctions.net/adoptPlant',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { plantId } })
      }
    );
    return response.json();
  }
}