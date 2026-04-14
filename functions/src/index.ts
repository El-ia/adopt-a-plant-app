import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

export const adoptPlant = onCall(async (request) => {
  const { plantId } = request.data;

  if (!plantId) {
    throw new HttpsError('invalid-argument', 'plantId is required');
  }

  const db = getFirestore();
  const plantRef = db.collection('plants').doc(plantId);
  const plant = await plantRef.get();

  if (!plant.exists) {
    throw new HttpsError('not-found', 'Plant not found');
  }

  const currentAdopted = plant.data()?.adopted ?? false;

  await plantRef.update({
    adopted: !currentAdopted,
    adoptedAt: currentAdopted ? null : new Date(),
  });

  return { success: true, adopted: !currentAdopted };
});