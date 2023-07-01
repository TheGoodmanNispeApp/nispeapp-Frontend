import {
  Action,
  PreloadedState,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import TelemetryReducer from '../features/telemetry/telemetry-slice';

export const store = configureStore({
  reducer: {
    telemetry: TelemetryReducer,
  },
});

export const rootReducer = combineReducers({
  telemetry: TelemetryReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
