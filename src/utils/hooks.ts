import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => RootDispatch = useDispatch;