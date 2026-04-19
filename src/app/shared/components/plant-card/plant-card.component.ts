import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plant } from '../../../core/models/plant.model';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-card.component.html'
})
export class PlantCardComponent {
  // Plant data received from HomeComponent
  @Input() plant!: Plant;

  // Communication channel to send the clicked plant back to HomeComponent
  @Output() selected = new EventEmitter<Plant>();

  // Triggered on card click — sends this plant to HomeComponent to open the modal
  onSelect() {
    this.selected.emit(this.plant);
  }
}