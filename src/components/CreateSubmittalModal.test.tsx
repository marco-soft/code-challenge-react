import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateSubmittalModal } from './CreateSubmittalModal';

describe('CreateSubmittalModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with all form fields', () => {
    render(<CreateSubmittalModal {...defaultProps} />);
    
    expect(screen.getByText('Create Item')).toBeInTheDocument();
    expect(screen.getByLabelText(/spec section/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sub spec section/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
  });

  it('should show validation errors for required fields when submitting empty form', async () => {
    render(<CreateSubmittalModal {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitButton);

    expect(screen.getByLabelText(/spec section/i)).toBeRequired();
    expect(screen.getByLabelText(/title/i)).toBeRequired();
    expect(screen.getByLabelText(/type/i)).toBeRequired();
  });

  it('should successfully submit the form with valid data', async () => {
    render(<CreateSubmittalModal {...defaultProps} />);
    
    const specSection = screen.getByLabelText(/spec section/i);
    const title = screen.getByLabelText(/title/i);
    const type = screen.getByLabelText(/type/i);
    
    fireEvent.mouseDown(specSection);
    const option = screen.getByText('000000 - Attachments');
    fireEvent.click(option);

    await userEvent.type(title, 'Test Submittal');

    fireEvent.mouseDown(type);
    const typeOption = screen.getByText('Submittal');
    fireEvent.click(typeOption);

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        specSection: '000000',
        subSpecSection: '',
        title: 'Test Submittal',
        description: '',
        type: 'Submittal',
      });
    });

    expect(await screen.findByText(/item created successfully/i)).toBeInTheDocument();
  });

  it('should close the modal when clicking cancel', () => {
    render(<CreateSubmittalModal {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should reset form after successful submission', async () => {
    render(<CreateSubmittalModal {...defaultProps} />);
    
    const specSection = screen.getByLabelText(/spec section/i);
    const title = screen.getByLabelText(/title/i);
    const type = screen.getByLabelText(/type/i);
    
    fireEvent.mouseDown(specSection);
    fireEvent.click(screen.getByText('000000 - Attachments'));
    await userEvent.type(title, 'Test Submittal');
    fireEvent.mouseDown(type);
    fireEvent.click(screen.getByText('Submittal'));

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    render(<CreateSubmittalModal {...defaultProps} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/spec section/i)).toHaveValue('');
    expect(screen.getByLabelText(/type/i)).toHaveValue('');
  });
});
