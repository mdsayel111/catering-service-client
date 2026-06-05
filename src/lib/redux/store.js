//
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/cartSlice";
import settingsReducer from "./features/settingsSlice";
import authReducer from "./features/authSlice";
import loadingReducer from "./features/loadingSlice";
import wishlistsReducer from "./features/wishlistSlice";

// Persist config
const persistAuthConfig = {
  key: "auth",
  storage,
};
const persistCartConfig = {
  key: "cart",
  storage,
};
const persistSettingsConfig = {
  key: "settings",
  storage,
};

const persistWishlistsConfig = {
  key: "wishlists",
  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedWishlistsReducer = persistReducer(
  persistWishlistsConfig,
  wishlistsReducer
);
const persistedSettingsReducer = persistReducer(
  persistSettingsConfig,
  settingsReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    settings: persistedSettingsReducer,
    loading: loadingReducer,
    wishlist: persistedWishlistsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
