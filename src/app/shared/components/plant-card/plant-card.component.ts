import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plant } from '../../../core/models/plant.model';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-card.component.html'
})
export class PlantCardComponent implements OnInit, OnDestroy {
  @Input() plant!: Plant;
  @Output() selected = new EventEmitter<Plant>();

  // Tracks which frame is currently displayed
  currentFrame = 1;
  private interval: any;

  ngOnInit() {
    // Switch frame every 600ms for the animation
    this.interval = setInterval(() => {
      this.currentFrame = this.currentFrame === 1 ? 2 : 1;
    }, 600);
  }

  ngOnDestroy() {
    // Clean up interval when component is destroyed
    clearInterval(this.interval);
  }

  get currentImageUrl(): string {
    return this.currentFrame === 1 ? this.plant.imageUrl : this.plant.imageUrl2;
  }

  onSelect() {
    this.selected.emit(this.plant);
  }
}