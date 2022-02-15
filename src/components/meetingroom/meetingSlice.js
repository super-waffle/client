import { createSlice } from "@reduxjs/toolkit";

export const meetingSlice = createSlice({
  name: "meeting",
  initialState: { meetingSeq: "" },
  reducers: {
    sendMeetingSeqRedux: (state, action) => {
      state.meetingSeq = action.payload;
    },
  },
});

export const { sendMeetingSeqRedux } = meetingSlice.actions;

export default meetingSlice.reducer;
