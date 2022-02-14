import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './components/Schedule/scheduleSlice';
import settingsReducer from './components/settings/settingsSlice';

export default configureStore({
  reducer: {
    schedule: scheduleReducer,
    settings: settingsReducer,
  },
});
