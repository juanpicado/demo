import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VolumeState {
    volume: number;
    muted: boolean;
}

const initialState: VolumeState = {
    volume: 1,
    muted: false,
};

const volumeSlice = createSlice({
    name: "volume",
    initialState,
    reducers: {
        updateVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        setMuted(state, action: PayloadAction<boolean>) {
            state.muted = action.payload;
        },
    },
});

export const { updateVolume, setMuted } = volumeSlice.actions;
export default volumeSlice.reducer;
