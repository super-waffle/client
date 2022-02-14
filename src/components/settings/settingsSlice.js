import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    nickname: '',
    userSeq: '',
    profileImg: '',
    selectedSeq: '',
  },
  reducers: {
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setUserSeq: (state, action) => {
      state.userSeq = action.payload;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    setSelectedSeq: (state, action) => {
      state.selectedSeq = JSON.stringify(action.payload);
    },
  },
});

export const { setNickname, setUserSeq, setProfileImg, setSelectedSeq } =
  settingsSlice.actions;
export default settingsSlice.reducer;
