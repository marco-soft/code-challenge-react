import { RouteObject } from 'react-router-dom';
import { SubmittalsPage } from '../pages/SubmittalsPage';
import { SubmittalDetail } from '../components/SubmittalDetail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SubmittalsPage />
  },
  {
    path: '/submittals/:id',
    element: <SubmittalDetail />
  }
];
