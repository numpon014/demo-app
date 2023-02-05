import uuid from 'react-uuid';
import { render, fireEvent } from '@testing-library/react';
import { ICommentDto } from 'dto/comment.dto';
import { act } from 'react-dom/test-utils';
import CommentForm from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn((key) => key) }),
}));

describe('#Comment Form', () => {
  describe('Create Comment', () => {
    test('should render the comment form for create mode successfully', () => {
      const mockOnFinish = jest.fn();
      const { container } = render(
        <CommentForm onFinish={mockOnFinish} />,
      );

      expect(container.querySelector('form[id=\'comment\']')).not.toBeNull();
      expect(container.querySelector("input[id='comment_id']")?.textContent).toEqual('');
      expect(container.querySelector("button[type='submit']")?.textContent).toEqual('comment.form.add_button');
      expect(container.querySelector("button[type='button'].cancel-button")).not.toBeInTheDocument();
    });

    test('should return the correct message data after submit', async () => {
      const spyOnFinish = jest.fn().mockImplementation((data: ICommentDto) => data);
      const { getByTestId } = render(
        <CommentForm onFinish={spyOnFinish} />,
      );
      const testMessage = 'abc';
      const submitButton = getByTestId('submit-button');
      const commentMessage = getByTestId('message-textarea');

      expect(commentMessage.innerHTML).toEqual('');

      await act(async () => {
        fireEvent.change(commentMessage, { target: { value: testMessage } });
      });
      expect(commentMessage.innerHTML).toEqual(testMessage);

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(spyOnFinish).toBeCalled();
      expect(spyOnFinish.mock.results[0].value).toEqual({ message: testMessage });
    });
  });

  describe('Update Comment', () => {
    const comment : ICommentDto = { message: 'This is comment 1', id: uuid() };

    test('should render the comment form for update mode successfully', () => {
      const mockOnFinish = jest.fn();
      const { container, getByTestId } = render(
        <CommentForm onFinish={mockOnFinish} comment={comment} />,
      );

      const commentTextArea = getByTestId('message-textarea');
      const commentIdInput = getByTestId('message-id');
      const submitButton = getByTestId('submit-button');

      expect(container.querySelector('form[id=\'comment\']')).not.toBeNull();
      expect(commentTextArea.innerHTML).toEqual(comment.message);
      expect(commentIdInput).toHaveValue(comment.id);
      expect(submitButton.textContent).toEqual('comment.form.update_button');
      expect(container.querySelector("button[type='button'].cancel-button")).toBeInTheDocument();
    });

    test('should update the message data after submit successfully', async () => {
      const spyOnFinish = jest.fn().mockImplementation((data: ICommentDto) => data);
      const { getByTestId } = render(
        <CommentForm onFinish={spyOnFinish} />,
      );
      const updateMessage = 'abc';
      const submitButton = getByTestId('submit-button');
      const commentMessage = getByTestId('message-textarea');

      expect(commentMessage.innerHTML).toEqual('');

      await act(async () => {
        fireEvent.change(commentMessage, { target: { value: updateMessage } });
      });
      expect(commentMessage.innerHTML).toEqual(updateMessage);

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(spyOnFinish).toBeCalled();
      expect(spyOnFinish.mock.results[0].value).toEqual({ message: updateMessage });
    });
  });
});
