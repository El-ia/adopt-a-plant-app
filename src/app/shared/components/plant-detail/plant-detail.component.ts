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
  // Plant data received from HomeComponent
  @Input() plant!: Plant;

  // Notifies HomeComponent to close the modal
  @Output() closed = new EventEmitter<void>();

  // Sends the plant to HomeComponent to trigger the Cloud Function
  @Output() toggled = new EventEmitter<Plant>();

  // Called when the user clicks ✕ or the overlay
  onClose() {
    this.closed.emit();
  }

  // Called when the user clicks adopt or release button
  onToggle() {
    this.toggled.emit(this.plant);
  }

  // Firestore returns dates as Timestamp — convert to JS Date for the date pipe
  getAdoptedDate(): Date | null {
    if (!this.plant.adoptedAt) return null;
    if (this.plant.adoptedAt instanceof Timestamp) {
      return this.plant.adoptedAt.toDate();
    }
    return this.plant.adoptedAt as Date;
  }
}