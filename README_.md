# Baby Growth Chart Tracker

**One-line:** A React Native (TypeScript) mini app to log baby growth (weight, height/length, head circumference) and visualize against WHO percentile curves.

---

## Demo video
Link : https://drive.google.com/drive/folders/1NeTlLzRr7zl3V_QZ5fds8m4XxejHo1ge?usp=sharing

## Table of contents
- Overview
- Features
- Screenshots
- Live demo
- Tech stack
- Setup & run
- Data & reference sources
- Architecture & design decisions
- Storage & migrations
- Testing
- Known trade-offs & future improvements
- What to check in the test plan

---

## Overview
This app allows a parent to add / edit / delete growth measurements for a baby, persists data locally (AsyncStorage), and renders growth charts (weight-for-age percentiles) using bundled WHO growth reference data. All reference data is stored locally; no runtime network calls.

---

## Features
- Measurement input (date, weight, height/length, head circumference) with SI / Imperial unit switch and validation.
- Edit & Delete with confirmation.
- Local persistence using `@react-native-async-storage/async-storage` under `growth/v1/state`.
- Growth charts (weight-for-age) with percentile curves (3,10,25,50,75,90,97) and tappable points showing percentile & details.
- History view with calculated percentiles.
- Robust age calculation (UTC midnight normalization) and migrations support.

---

## Screens / UX
1. Home ( quick add and unit prefs)
2. Add / Edit Measurement
3. History (list of measurements)
4. Growth Chart
---

## Tech stack
- Framework: React Native + Expo (TypeScript)
- Charts: `victory-native` (reason: composable, accessible tooltips, stable SVG rendering on RN)
- Storage: `@react-native-async-storage/async-storage` (optional: `expo-secure-store` for encrypted storage)
- Forms: `react-hook-form` for validation (or custom validation where indicated)
- Date: `dayjs` with `utc` plugin

---

## Setup & run

Requirements:
- Node >= 18
- Yarn or npm
- Java jdk 17

Steps:
1. Clone:
   
   git clone https://github.com/dhruv9596/BabyGrowthTracker/new/final
   cd baby-growth-tracker

2. Run metro and npm run android   
