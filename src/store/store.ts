import { configureStore } from '@reduxjs/toolkit';
import submittalsReducer from './submittalsSlice';

export const store = configureStore({
  reducer: {
    submittals: submittalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
