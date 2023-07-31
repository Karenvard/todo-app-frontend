import {configureStore} from "@reduxjs/toolkit";
import {Reducer} from "./reducer";


export const Store = configureStore({
    reducer: Reducer,
})

export type RootState = ReturnType<typeof Store.getState>
export type RootDispatch = typeof Store['dispatch']