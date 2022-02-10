import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './components/Schedule/scheduleSlice';

export default configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
});
