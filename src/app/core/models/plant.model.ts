import { Timestamp } from '@angular/fire/firestore';

export interface Plant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  adopted: boolean;
  adoptedAt: Timestamp | Date | null;
  rarity: 'Commun' | 'Peu commun' | 'Rare' | 'Légendaire';
  mood: string;
}