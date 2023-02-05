import uuid from 'react-uuid';
import { render, screen, fireEvent } from '@testing-library/react';
import { ICommentDto } from 'dto/comment.dto';
import { act } from 'react-dom/test-utils';
import CommentForm from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn((key) => key) }),
}));

describe('#Comment Form', () => {
  const comments : ICommentDto[] = [
    { message: 'This is comment 1', id: uuid() },
    { message: 'This is comment 2', id: uuid() },
    { message: 'This is comment 3', id: uuid() },
  ];

  const mockOnFinish = () => {};

  describe('Create Comment', () => {
    test('should render the comment form for create mode successfully', () => {
      const { container } = render(
        <CommentForm onFinish={mockOnFinish} />,
      );

      expect(container.querySelector('form[id=\'comment\']')).not.toBeNull();
      expect(container.querySelector("input[id='comment_id']")?.textContent).toEqual('');
      expect(container.querySelector("button[type='submit']")?.textContent).toEqual('comment.form.add_button');
    });

    test('should return the correct message data after submit', async () => {
      const spyOnFinish = jest.fn().mockImplementation((data: ICommentDto) => data);
      const { getByTestId } = render(
        <CommentForm onFinish={spyOnFinish} />,
      );

      const submitButton = getByTestId('submit-button');
      const commentMessage = getByTestId('message-textarea');

      expect(commentMessage.innerHTML).toEqual('');

      await act(async () => {
        fireEvent.change(commentMessage, { target: { value: 'abc' } });
      });
      expect(commentMessage.innerHTML).toEqual('abc');

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(spyOnFinish).toBeCalled();
      expect(spyOnFinish.mock.results[0].value).toEqual({ message: 'abc' });
    });
  });
});
