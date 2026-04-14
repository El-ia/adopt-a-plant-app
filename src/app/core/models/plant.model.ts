export interface Plant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  adopted: boolean;
  adoptedAt: Date | null;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  mood: string;
}