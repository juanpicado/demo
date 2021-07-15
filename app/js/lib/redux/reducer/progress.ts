import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
    progress: number;
    buffer: number;
}

const initialState: ProgressState = {
    progress: 0,
    buffer: 0,
};

const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        updateProgress(state, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
        updateBuffer(state, action: PayloadAction<number>) {
            state.buffer = action.payload;
        },
    },
});

export const { updateProgress, updateBuffer } = progressSlice.actions;
export default progressSlice.reducer;
