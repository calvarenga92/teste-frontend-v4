import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';

describe('Tests in Map', () => {
  test('renders Modal component', () => {
    const onClose = jest.fn();
    render(
      <Modal
        onClose={onClose}
        isOpen={true}
      >
        <div>Modal</div>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal');
    expect(modalContent).toBeDefined();

    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});