import thunk from "redux-thunk";
import reducer from "./reducers";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Middleware } from "@reduxjs/toolkit";

const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== "production") {
    // middleware.push(createLogger());
}

export const store = createStore(reducer, applyMiddleware(...middleware));

export type RootState = ReturnType<typeof store.getState>;
