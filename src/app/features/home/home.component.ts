import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../core/services/plant.service';
import { PlantCardComponent } from '../../shared/components/plant-card/plant-card.component';
import { PlantDetailComponent } from '../../shared/components/plant-detail/plant-detail.component';
import { Plant } from '../../core/models/plant.model';

// Allowed values for the plant list filter
type Filter = 'all' | 'available' | 'adopted';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlantCardComponent, PlantDetailComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Access plant data and actions
  private plantService = inject(PlantService);

  // All plants from Firestore (real-time)
  plants$ = this.plantService.getPlants();

  // Active filter — defaults to 'all'
  filter = signal<Filter>('all');

  // Selected plant for the modal
  selectedPlant = signal<Plant | null>(null);

  // Filter buttons config — avoids repeating HTML for each button
  filters: { value: Filter; label: string }[] = [
    { value: 'all', label: '🪴 Toutes' },
    { value: 'available', label: '🌱 Disponibles' },
    { value: 'adopted', label: '💚 Adoptées' }
  ];

  // Called when the user clicks a filter button — updates the active filter
  setFilter(filter: Filter) {
    this.filter.set(filter);
  }

  // Open the detail modal
  selectPlant(plant: Plant) {
    this.selectedPlant.set(plant);
  }

  // Close the detail modal
  closeDetail() {
    this.selectedPlant.set(null);
  }

  // Return plants based on the active filter
  filterPlants(plants: Plant[]): Plant[] {
    const currentFilter = this.filter();
    if (currentFilter === 'available') return plants.filter(plant => !plant.adopted);
    if (currentFilter === 'adopted') return plants.filter(plant => plant.adopted);
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

  // Count adopted plants for the header
  countAdopted(plants: Plant[]): number {
    return plants.filter(plant => plant.adopted).length;
  }
}