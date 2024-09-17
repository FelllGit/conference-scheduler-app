import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces/meetings.ts";

interface UserFilterState {
  selectedUser: User | null;
}

const initialState: UserFilterState = {
  selectedUser: null,
};

const userFilterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    setUserFilter(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUserFilter } = userFilterSlice.actions;
export default userFilterSlice.reducer;
