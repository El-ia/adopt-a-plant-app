import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK — no config needed server-side
initializeApp();

// HTTP Cloud Function — called by Angular to adopt or unadopt a plant
export const adoptPlant = onRequest({
  cors: true, // Allow requests from the browser
}, async (req, res) => {

  // Extract plantId from the request body sent by Angular
  const { plantId } = req.body.data;

  // Guard — return 400 if plantId is missing
  if (!plantId) {
    res.status(400).json({ error: 'plantId is required' });
    return;
  }

  // Connect to Firestore and get the target plant document
  const db = getFirestore();
  const plantRef = db.collection('plants').doc(plantId);
  const plant = await plantRef.get();

  // Guard — return 404 if plant doesn't exist
  if (!plant.exists) {
    res.status(404).json({ error: 'Plant not found' });
    return;
  }

  // Read current adopted state — default to false if undefined
  const currentAdopted = plant.data()?.adopted ?? false;

  // Toggle adopted state and update adoptedAt accordingly
  await plantRef.update({
    adopted: !currentAdopted,
    adoptedAt: currentAdopted ? null : new Date(),
  });

  // Return the new state to Angular
  res.json({ data: { success: true, adopted: !currentAdopted } });
});