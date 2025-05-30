import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from './store';

// withTypes<AppDispatch>() tells TypeScript: “My dispatch function has the type AppDispatch.”
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();