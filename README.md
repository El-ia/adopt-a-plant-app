# 🌿 Pixel Plant Garden

A kawaii pixel art plant adoption app built with Angular and Firebase.

## ✨ Features

- Browse a collection of 8 unique kawaii plants
- Filter plants by status: All / Available / Adopted
- Click on a plant to see its details (rarity, mood, adoption date)
- Adopt or release a plant via a Firebase Cloud Function
- Real-time updates with Firestore
- Responsive design (mobile, tablet, desktop)

## 🛠️ Tech Stack

- **Frontend**: Angular 21 (standalone components, signals)
- **Backend**: Firebase Firestore + Cloud Functions
- **Styling**: Tailwind CSS
- **Hosting**: Firebase Hosting

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- Angular CLI
- Firebase CLI

### Installation

```bash
npm install
```

### Development server

```bash
ng serve
```

Open `http://localhost:4200/`

### Build

```bash
ng build
```

### Deploy

```bash
firebase deploy
```

## 🗂️ Project Structure

```src/app/
core/
models/         # Plant interface
services/       # PlantService (Firestore + Cloud Functions)
features/
home/           # Main page component
shared/
components/
plant-card/   # Plant card with animation
plant-detail/ # Plant detail modal
functions/
src/
index.ts        # adoptPlant Cloud Function
```

## 💡 Technical Choices

- **Direct Firestore reads** for real-time plant list updates
- **Cloud Function** for adoption logic — keeps business logic server-side
- **Angular Signals** for local state management (filter, selected plant)
- **Single page** — no routing needed for this scope

