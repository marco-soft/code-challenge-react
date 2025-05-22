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
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export interface CreateSubmittalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubmittalPayload) => Promise<Submittal>;
}
