import { ReactNode } from 'react';
import { Submittal, CreateSubmittalPayload } from './submittal';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface SubmittalsTableProps {
  submittals: Submittal[];
  loading: boolean;
  error: string | null;
}

export interface CreateSubmittalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubmittalPayload) => void;
}
