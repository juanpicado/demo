import { App } from "../../../../types/app";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItemById } from "../../api/backend";
import { MediaTypes } from "../../util/media-types";
import { RootState } from "../store";

interface ItemsState {
    entities: Record<string, App.ItemDetails>;
    fetchRequests: number[];
}

interface ThunkParams {
    id: number;
    type: MediaTypes;
}

const initialState: ItemsState = {
    entities: {},
    fetchRequests: [],
};

export const preloadItem = createAsyncThunk<App.ItemDetails | null, ThunkParams>(
    "items/preloadItem",
    async ({ id, type }, thunkAPI) => {
        const { items } = thunkAPI.getState() as RootState;

        if (!!items.entities[id]) {
            return null;
        }

        thunkAPI.dispatch(registerFetchRequest(id));

        return await getItemById(id, type);
    }
);

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        registerFetchRequest(state, action: PayloadAction<number>) {
            state.fetchRequests.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(preloadItem.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }

            state.entities = { ...state.entities, [payload.id]: payload };
        });
    },
});

export const { registerFetchRequest } = itemSlice.actions;
export default itemSlice.reducer;
