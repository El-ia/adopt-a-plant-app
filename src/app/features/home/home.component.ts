import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  // Filter plants based on active filter
  filterPlants(plants: Plant[]): Plant[] {
    const f = this.filter();
    if (f === 'available') return plants.filter(p => !p.adopted);
    if (f === 'adopted') return plants.filter(p => p.adopted);
    return plants;
  }

  // Adopt or unadopt a plant via Cloud Function
  async toggleAdopt(plant: Plant) {
    await this.plantService.adoptPlant(plant.id);
    this.closeDetail();
  }

  // Count adopted plants
  countAdopted(plants: Plant[]): number {
    return plants.filter(p => p.adopted).length;
  }
}