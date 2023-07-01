import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getTelemetry } from './telemetry-api';

export type TelemetryReponse = Telemetry[] | { msg: string };

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
  telemetryMessage: string;
}

const initialState: TelemetryState = {
  status: 'idle',
  telemetry: [],
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
      });
  },
});

export const telemetryState = (state: RootState) => state.telemetry;
export const selectLatetTelemetry = (state: RootState) => {
  const latestIndex = state.telemetry?.telemetry.length;
  return state.telemetry?.telemetry[latestIndex - 1];
};

export default telemetrySlice.reducer;
