import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import WelcomeScreen from "./screens/WelcomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState("welcome");

  return (
    <>
      <StatusBar style="light" />

      {currentScreen === "welcome" ? (
        <WelcomeScreen
          onGetStarted={() =>
            setCurrentScreen("profile")
          }
        />
      ) : (
        <ProfileScreen />
      )}
    </>
  );
}