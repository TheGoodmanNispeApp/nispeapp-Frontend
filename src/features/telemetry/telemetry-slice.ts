import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getLatestTelemetry, getTelemetry } from './telemetry-api';

export type TelemetryReponse = Telemetry[] | { msg: string };

export type LatestTelemetryReponse = Telemetry | { msg: string };

export type TelemetryMeasurement = 'light' | 'humidity' | 'temperature';

export type Telemetry = {
  timestamp: number;
  measurements: {
    light: number;
    temperature: number;
    humidity: number;
  };
};

export interface TelemetryState {
  status: 'idle' | 'loading' | 'failed';
  telemetry: Telemetry[];
  latestTelemetry: Telemetry | null;
  historicalTelemetry: Telemetry[];
  telemetryMessage: string;
}

const initialState: TelemetryState = {
  status: 'idle',
  telemetry: [],
  historicalTelemetry: [],
  latestTelemetry: null,
  telemetryMessage: '',
};

export const getTelemetryAsync = createAsyncThunk(
  'getTelemetry/fetch',
  async () => {
    const response = await getTelemetry();
    const apiRes: TelemetryReponse = await response.json();

    if (!response.ok) {
      throw new Error((apiRes as { msg: string }).msg);
    }

    return apiRes;
  },
);

export const getLatestTelemetryAsync = createAsyncThunk(
  'getLatestTelemetry/fetch',
  async () => {
    const response = await getLatestTelemetry();
    const apiRes: LatestTelemetryReponse = await response.json();

    if (!response.ok) {
      throw new Error((apiRes as { msg: string }).msg);
    }

    return apiRes;
  },
);

export const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getTelemetryAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getTelemetryAsync.fulfilled,
        (state, action: PayloadAction<TelemetryReponse>) => {
          state.status = 'idle';
          state.telemetry = action.payload as Telemetry[];
        },
      )
      .addCase(getTelemetryAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.telemetryMessage = action.error.message;
      })
      .addCase(getLatestTelemetryAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getLatestTelemetryAsync.fulfilled,
        (state, action: PayloadAction<LatestTelemetryReponse>) => {
          state.status = 'idle';
          state.latestTelemetry = action.payload as Telemetry;
        },
      )
      .addCase(getLatestTelemetryAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.telemetryMessage = action.error.message;
      });
  },
});

export const telemetryState = (state: RootState) => state.telemetry;
export const selectLatestTelemetry = (state: RootState) =>
  state.telemetry.latestTelemetry;
export const selectHistoricalTelemetry = (state: RootState) =>
  state.telemetry.historicalTelemetry;

export default telemetrySlice.reducer;
