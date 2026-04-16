import { Component, inject, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { PlantService } from '../../core/services/plant.service';
import { PlantCardComponent } from '../../shared/components/plant-card/plant-card.component';
import { PlantDetailComponent } from '../../shared/components/plant-detail/plant-detail.component';
import { Plant } from '../../core/models/plant.model';

type Filter = 'all' | 'available' | 'adopted';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlantCardComponent, PlantDetailComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private plantService = inject(PlantService);

  // All plants from Firestore (real-time)
  plants$ = this.plantService.getPlants();

  // Active filter
  filter = signal<Filter>('all');

  // Selected plant for the modal
  selectedPlant = signal<Plant | null>(null);

  setFilter(f: Filter) {
    this.filter.set(f);
  }

  selectPlant(plant: Plant) {
    this.selectedPlant.set(plant);
  }

  closeDetail() {
    this.selectedPlant.set(null);
  }

  filterPlants(plants: Plant[]): Plant[] {
    const f = this.filter();
    if (f === 'available') return plants.filter(p => !p.adopted);
    if (f === 'adopted') return plants.filter(p => p.adopted);
    return plants;
  }

  // Adopt or unadopt via Cloud Function — refresh modal with updated plant
  async toggleAdopt(plant: Plant) {
    await this.plantService.adoptPlant(plant.id);
    const sub = this.plants$.subscribe(plants => {
      const updated = plants.find(p => p.id === plant.id);
      if (updated) {
        this.selectedPlant.set(updated);
        sub.unsubscribe();
      }
    });
  }

  countAdopted(plants: Plant[]): number {
    return plants.filter(p => p.adopted).length;
  }
}