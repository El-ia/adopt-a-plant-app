import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

export const adoptPlant = onRequest({
  cors: true,
}, async (req, res) => {
  const { plantId } = req.body.data;

  if (!plantId) {
    res.status(400).json({ error: 'plantId is required' });
    return;
  }

  const db = getFirestore();
  const plantRef = db.collection('plants').doc(plantId);
  const plant = await plantRef.get();

  if (!plant.exists) {
    res.status(404).json({ error: 'Plant not found' });
    return;
  }

  const currentAdopted = plant.data()?.adopted ?? false;

  await plantRef.update({
    adopted: !currentAdopted,
    adoptedAt: currentAdopted ? null : new Date(),
  });

  res.json({ data: { success: true, adopted: !currentAdopted } });
});