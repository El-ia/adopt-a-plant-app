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
  // The plant to display
  @Input() plant!: Plant;
  
  // Emits when the card is clicked
  @Output() selected = new EventEmitter<Plant>();

  onSelect() {
    this.selected.emit(this.plant);
  }
}