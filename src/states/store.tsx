import reduxStorage from "./Storage";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
    key: 'root', // The key for storing your state in storage (e.g., localStorage)
    storage: reduxStorage, // The storage engine to use
    blacklist: [], // State slices NOT to persist (empty here)
    whitelist:['user','cart'] // State slices TO persist (only 'user' and 'cart')
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // Wraps your rootReducer with persistence logic

export const store = configureStore({
    reducer: persistedReducer, // Uses the persisted reducer for the store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE] // Ignores these actions in serializable checks (they can contain non-serializable data)
            }
        })
})

export const persistor = persistStore(store); // Persistor controls the saving and loading of Redux state.

export type RootState = ReturnType<typeof store.getState>; // Type for the whole Redux state tree
export type AppDispatch = typeof store.dispatch; // Type for the store's dispatch function