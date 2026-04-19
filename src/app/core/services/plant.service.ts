import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

// Single instance shared across the whole app
@Injectable({ providedIn: 'root' })
export class PlantService {
  // Inject Firestore connection
  private firestore = inject(Firestore);

  // Returns a real-time stream of all plants from Firestore
  getPlants(): Observable<Plant[]> {
    const plantsCol = collection(this.firestore, 'plants');
    // idField adds the Firestore document ID as 'id' on each plant
    return collectionData(plantsCol, { idField: 'id' }) as Observable<Plant[]>;
  }

  // Calls the Cloud Function via HTTP to adopt or unadopt a plant
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