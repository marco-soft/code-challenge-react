export interface Submittal {
  number: number;
  status: 'Open' | 'Closed';
  spec: string;
  rev: string;
  title: string;
  type: string;
  priority: 'Normal' | 'High';
  package: string;
  ballInCourt: string;
  dueDate: string | null;
  response: string;
}

export interface CreateSubmittalPayload {
  specSection: string;
  subSpecSection?: string;
  title: string;
  description?: string;
  type: string;
}
