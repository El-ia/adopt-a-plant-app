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
  @Input() plant!: Plant;
  @Output() selected = new EventEmitter<Plant>();

  onSelect() {
    this.selected.emit(this.plant);
  }
}