import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToastContainer from './ToastContainer';
import { useToastStore } from '@/hooks/useToast';

// Mock the useToastStore hook
vi.mock('@/hooks/useToast', () => ({
  useToastStore: vi.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseToastStore = useToastStore as any as ReturnType<typeof vi.fn>;

describe('ToastContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when no toasts exist', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [],
      removeToast: vi.fn(),
    });
    const { container } = render(<ToastContainer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders toast when toasts array has items', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'success' as const, message: 'Test message' }],
      removeToast: vi.fn(),
    });
    render(<ToastContainer />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [
        { id: '1', type: 'success' as const, message: 'Success message' },
        { id: '2', type: 'error' as const, message: 'Error message' },
      ],
      removeToast: vi.fn(),
    });
    render(<ToastContainer />);
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders success toast with correct styling', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'success' as const, message: 'Success' }],
      removeToast: vi.fn(),
    });
    render(<ToastContainer />);
    // Check for green text color in the message
    const message = screen.getByText('Success');
    expect(message.className).toContain('text-green-300');
  });

  it('renders error toast with correct styling', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'error' as const, message: 'Error' }],
      removeToast: vi.fn(),
    });
    render(<ToastContainer />);
    // Check for red text color in the message
    const message = screen.getByText('Error');
    expect(message.className).toContain('text-red-300');
  });

  it('renders warning toast with correct styling', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'warning' as const, message: 'Warning' }],
      removeToast: vi.fn(),
    });
    render(<ToastContainer />);
    // Check for yellow text color in the message
    const message = screen.getByText('Warning');
    expect(message.className).toContain('text-yellow-300');
  });

  it('renders info toast with correct styling', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'info' as const, message: 'Info' }],
      removeToast: vi.fn(),
    });
    render(<ToastContainer />);
    // Check for blue text color in the message
    const message = screen.getByText('Info');
    expect(message.className).toContain('text-blue-300');
  });

  it('has close button for each toast', () => {
    const removeToast = vi.fn();
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'success' as const, message: 'Test' }],
      removeToast,
    });
    render(<ToastContainer />);
    const closeButton = document.querySelector('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls removeToast when close button is clicked', () => {
    const removeToast = vi.fn();
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: 'test-id', type: 'success' as const, message: 'Test' }],
      removeToast,
    });
    render(<ToastContainer />);
    fireEvent.click(document.querySelector('button')!);
    expect(removeToast).toHaveBeenCalledWith('test-id');
  });

  it('has correct position classes', () => {
    mockUseToastStore.mockReturnValue({
      toasts: [{ id: '1', type: 'success' as const, message: 'Test' }],
      removeToast: vi.fn(),
    });
    const { container } = render(<ToastContainer />);
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('fixed');
    expect(containerDiv.className).toContain('top-4');
    expect(containerDiv.className).toContain('right-4');
    expect(containerDiv.className).toContain('z-50');
  });
});
