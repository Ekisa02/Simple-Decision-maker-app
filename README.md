# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## React.js Conversion

A new React web version of this app lives in the `web/` directory. The
`web` project was initialized with **Create React App** and contains
`src/` with copies of shared folders (`components`, `assets`, etc.). The
initial `App.jsx` is a placeholder; you'll need to:

1. Replace React Native imports (`View`, `Text`, `StyleSheet`, etc.) with
   standard HTML elements or a web UI library.
2. Swap Expo/`react-native` APIs for web equivalents (e.g. `localStorage`
   instead of `AsyncStorage`, `fetch` or file-input instead of
   `DocumentPicker`, remove `Haptics`, etc.).
3. Update routing/navigation (React Router, Next.js, etc.) instead of
   `expo-router`.
4. Adjust stylesheets, assets paths, and any platform‑specific logic.

Run the web app:

```bash
cd web
npm install
npm start
```

Feel free to delete the original Expo project when the migration is
complete or keep both if you want multi‑platform support.
