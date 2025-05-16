import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Submittal, CreateSubmittalPayload } from '../types/submittal';
import { api } from '../services/api';

interface SubmittalsState {
  items: Submittal[];
  loading: boolean;
  error: string | null;
}

const initialState: SubmittalsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchSubmittals = createAsyncThunk(
  'submittals/fetchSubmittals',
  async () => {
    return await api.getSubmittals();
  }
);

export const createSubmittal = createAsyncThunk(
  'submittals/createSubmittal',
  async (payload: CreateSubmittalPayload) => {
    return await api.createSubmittal(payload);
  }
);

const submittalsSlice = createSlice({
  name: 'submittals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmittals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmittals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubmittals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch submittals';
      })
      .addCase(createSubmittal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default submittalsSlice.reducer;
