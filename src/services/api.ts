import axios from 'axios';
import { Submittal, CreateSubmittalPayload } from '../types/submittal';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://submittals-api.free.beeceptor.com';

export const api = {
  getSubmittals: async (): Promise<Submittal[]> => {
    const response = await axios.get(`${API_BASE_URL}/submittals`);
    return response.data;
  },

  createSubmittal: async (payload: CreateSubmittalPayload): Promise<Submittal> => {
    const response = await axios.post(`${API_BASE_URL}/submittals`, payload);
    return response.data;
  }
};
