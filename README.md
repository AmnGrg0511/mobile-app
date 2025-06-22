# Amrutam Mobile App

A modern React Native app built with Expo, inspired by Figma designs for routine management, reminders, and patient care.

## Features
- Routine management (create, assign, and view routines)
- Patient management and chat
- Multi-step routine creation with reminders, benefits, and caregivers
- Custom time slot and reminder item flows
- Beautiful, Figma-inspired UI

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://classic.yarnpkg.com/lang/en/) or npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/):
  ```sh
  npm install -g expo-cli
  ```
- (Optional) [Expo Go](https://expo.dev/client) app on your iOS/Android device for live preview

## Setup Instructions

1. **Clone the repository or download the code.**

2. **Navigate to the project directory:**
   ```sh
   cd mobile-app
   ```

3. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

4. **Start the Expo development server:**
   ```sh
   npx expo start
   # or
   yarn start
   ```

5. **Run the app:**
   - **On your device:**
     - Scan the QR code in your terminal or browser using the Expo Go app.
   - **On an emulator/simulator:**
     - Press `a` for Android or `i` for iOS in the Expo CLI terminal.

## Project Structure
- `app/` — Main app screens and navigation
- `components/` — Reusable UI components
- `assets/` — Images, icons, and fonts
- `constants/` — Theme and color constants

## Customization
- Update images in `assets/images/` to match your brand or Figma assets.
- Adjust theme/colors in `constants/Colors.ts`.
- Modify or extend screens in `app/` as needed.

## Notes
- The app uses [expo-router](https://expo.github.io/router/docs/) for file-based navigation.
- Some screens use dummy/static data for demonstration. Replace with your API or state management as needed.
- For best results, use the latest Expo SDK and keep dependencies up to date.

## Troubleshooting
- If you encounter issues with dependencies, try deleting `node_modules` and `package-lock.json`/`yarn.lock`, then reinstall.
- For native module errors, ensure you are using Expo Go or have run `npx expo prebuild` for a bare workflow.

## License
MIT
