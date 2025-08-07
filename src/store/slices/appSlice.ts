// src/store/slices/appSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  hasCompletedOnboarding: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  currentGreeting: string;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good Morning! ☀️';
  } else if (hour < 17) {
    return 'Good Afternoon! ⛅';
  } else {
    return 'Good Evening! 🌙';
  }
};

const initialState: AppState = {
  hasCompletedOnboarding: false,
  isSubscribed: false,
  isLoading: false,
  currentGreeting: getGreeting(),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHasCompletedOnboarding: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedOnboarding = action.payload;
    },
    
    setIsSubscribed: (state, action: PayloadAction<boolean>) => {
      state.isSubscribed = action.payload;
    },
    
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    updateGreeting: (state) => {
      state.currentGreeting = getGreeting();
    },
    
    resetApp: (state) => {
      state.hasCompletedOnboarding = false;
      state.isSubscribed = false;
      state.isLoading = false;
      state.currentGreeting = getGreeting();
    },
  },
});

export const {
  setHasCompletedOnboarding,
  setIsSubscribed,
  setIsLoading,
  updateGreeting,
  resetApp,
} = appSlice.actions;

export default appSlice.reducer;