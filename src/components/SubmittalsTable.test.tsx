import { render, screen } from '@testing-library/react';
import { SubmittalsTable } from './SubmittalsTable';

const defaultProps = {
  submittals: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 10,
  totalCount: 0,
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
};

describe('SubmittalsTable', () => {
  it('should display loading state', () => {
    render(<SubmittalsTable {...defaultProps} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message', () => {
    const errorMessage = 'Failed to load submittals';
    render(<SubmittalsTable {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
