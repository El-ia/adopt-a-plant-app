import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plant } from '../../../core/models/plant.model';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-detail.component.html'
})
export class PlantDetailComponent {
  // The selected plant to display in the modal
  @Input() plant!: Plant;

  // Emits when the modal is closed
  @Output() closed = new EventEmitter<void>();

  // Emits when adopt/unadopt button is clicked
  @Output() toggled = new EventEmitter<Plant>();

  onClose() {
    this.closed.emit();
  }

  onToggle() {
    this.toggled.emit(this.plant);
  }
}