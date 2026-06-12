
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';

import { COLORS } from './constants/colors';

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState('welcome');

  // Temporary nav link — Day 6 replaces all of this with real tabs
  const NavLink = ({ to, label }) => (
    <Pressable
      onPress={() => setCurrentScreen(to)}
      style={{
        padding: 16,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: COLORS.primary,
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <StatusBar style='light' />

      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onGetStarted={() =>
            setCurrentScreen('home')
          }
        />
      )}

      {currentScreen === 'home' && (
        <>
          <HomeScreen />
          <NavLink
            to='profile'
            label='Go to Profile →'
          />
        </>
      )}

      {currentScreen === 'profile' && (
        <>
          <ProfileScreen />
          <NavLink
            to='home'
            label='← Back to Expenses'
          />
        </>
      )}
    </>
  );
}