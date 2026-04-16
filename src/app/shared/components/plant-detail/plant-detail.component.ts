import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plant } from '../../../core/models/plant.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-detail.component.html'
})
export class PlantDetailComponent {
  @Input() plant!: Plant;
  @Output() closed = new EventEmitter<void>();
  @Output() toggled = new EventEmitter<Plant>();

  onClose() {
    this.closed.emit();
  }

  onToggle() {
    this.toggled.emit(this.plant);
  }

  // Convert Firestore Timestamp or Date to JS Date
  getAdoptedDate(): Date | null {
    if (!this.plant.adoptedAt) return null;
    if (this.plant.adoptedAt instanceof Timestamp) {
      return this.plant.adoptedAt.toDate();
    }
    return this.plant.adoptedAt as Date;
  }
}