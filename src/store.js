import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./components/Schedule/scheduleSlice";
import settingsReducer from "./components/settings/settingsSlice";
import meetingReducer from "./components/meetingroom/meetingSlice";

export default configureStore({
  reducer: {
    schedule: scheduleReducer,
    settings: settingsReducer,
    meeting: meetingReducer,
  },
});
