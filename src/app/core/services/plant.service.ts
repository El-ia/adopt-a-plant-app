import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({ providedIn: 'root' })
export class PlantService {
  private firestore = inject(Firestore);
  private functions = inject(Functions);

  getPlants(): Observable<Plant[]> {
    const plantsCol = collection(this.firestore, 'plants');
    return collectionData(plantsCol, { idField: 'id' }) as Observable<Plant[]>;
  }

  adoptPlant(plantId: string): Promise<any> {
    const fn = httpsCallable(this.functions, 'adoptPlant');
    return fn({ plantId });
  }
}