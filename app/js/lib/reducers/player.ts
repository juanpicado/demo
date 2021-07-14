import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
    playing: boolean;
    waiting: boolean;
    fullscreen: boolean;
    controls: boolean;
}

const initialState: PlayerState = {
    playing: false,
    waiting: false,
    fullscreen: false,
    controls: true,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setPlaying(state, action: PayloadAction<boolean>) {
            state.playing = action.payload;
        },
        setWaiting(state, action: PayloadAction<boolean>) {
            state.waiting = action.payload;
        },
        setFullscreen(state, action: PayloadAction<boolean>) {
            state.fullscreen = action.payload;
        },
        setControls(state, action: PayloadAction<boolean>) {
            state.controls = action.payload;
        },
    },
});

export const { setPlaying, setWaiting, setFullscreen, setControls } = playerSlice.actions;
export default playerSlice.reducer;
