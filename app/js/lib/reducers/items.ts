import { App } from "../../../types/app";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItemById } from "../api/backend";
import { MediaTypes } from "../util/media-types";
import { RootState } from "../store";

interface ItemsState {
    entities: Record<string, App.ItemDetails>;
}

const initialState: ItemsState = {
    entities: {},
};

interface Params {
    id: number;
    type: MediaTypes;
}

export const preloadItem = createAsyncThunk(
    "items/preloadItem",
    async ({ id, type }: Params, thunkAPI) => {
        const { items } = thunkAPI.getState() as RootState;

        if (!!items.entities[id]) {
            return null;
        }

        return await getItemById(id, type);
    }
);

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            preloadItem.fulfilled,
            (state, action: PayloadAction<App.ItemDetails | null>) => {
                const item = action.payload;

                if (item) {
                    state.entities = { ...state.entities, [item.id]: item };
                }
            }
        );
    },
});

export default itemSlice.reducer;
