import axios from 'axios';
import type { CVAnalysis, JobMatchResult } from '../types/analysis.types';

const api = axios.create({ baseURL: '/api' });

export const analyzeCV = async (file: File): Promise<CVAnalysis> => {
  const formData = new FormData();
  formData.append('cv', file);

  const { data } = await api.post<{ success: boolean; analysis: CVAnalysis }>(
    '/analyze',
    formData
  );
  return data.analysis;
};

export const matchCVWithJob = async (
  file: File,
  jobDescription: string
): Promise<JobMatchResult> => {
  const formData = new FormData();
  formData.append('cv', file);
  formData.append('jobDescription', jobDescription);

  const { data } = await api.post<{ success: boolean; match: JobMatchResult }>(
    '/match',
    formData
  );
  return data.match;
};