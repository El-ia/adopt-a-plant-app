import { TestBed } from '@angular/core/testing';
import { PlantService } from './plant.service';
import { Firestore } from '@angular/fire/firestore';

// Test suite for PlantService
describe('PlantService', () => {
  let service: PlantService;

  // Run before each test — sets up the testing environment
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantService,
        // Mock Firestore — simulates Firebase without a real connection
        { provide: Firestore, useValue: { collection: () => {} } }
      ]
    });
    // Inject the service instance to test
    service = TestBed.inject(PlantService);
  });

  // Test 1 — the service is successfully created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});