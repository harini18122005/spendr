
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';

import { COLORS } from './constants/colors';
import { FAKE_EXPENSES } from './constants/expenses';

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState('welcome');

  // Day 5: expenses state lives here
  const [expenses, setExpenses] =
    useState(FAKE_EXPENSES);

  // Add new expense
  const addExpense = (expense) => {
    setExpenses((prev) => [
      expense,
      ...prev,
    ]);
  };

  // Temporary nav link
  const NavLink = ({ to, label }) => (
    <Pressable
      onPress={() =>
        setCurrentScreen(to)
      }
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
      <StatusBar style="light" />

      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onGetStarted={() =>
            setCurrentScreen('home')
          }
        />
      )}

      {currentScreen === 'home' && (
        <>
          <HomeScreen expenses={expenses} />

          <NavLink
            to="add"
            label="+ Add Expense"
          />

          <NavLink
            to="profile"
            label="Profile →"
          />
        </>
      )}

      {currentScreen === 'add' && (
        <>
          <AddScreen
            onAdd={(e) => {
              addExpense(e);
              setCurrentScreen('home');
            }}
          />

          <NavLink
            to="home"
            label="← Cancel"
          />
        </>
      )}

      {currentScreen === 'profile' && (
        <>
          <ProfileScreen />

          <NavLink
            to="home"
            label="← Back to Expenses"
          />
        </>
      )}
    </>
  );
}