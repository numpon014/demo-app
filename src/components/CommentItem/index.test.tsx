import uuid from 'react-uuid';
import { render, screen, fireEvent } from '@testing-library/react';
import { ICommentDto } from 'dto/comment.dto';
import CommentItem from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn((key) => key) }),
}));

describe('#Comment Item', () => {
  const comments : ICommentDto[] = [
    { message: 'This is comment 1', id: uuid() },
    { message: 'This is comment 2', id: uuid() },
    { message: 'This is comment 3', id: uuid() },
  ];

  const mockUpdateFunction = jest.fn();

  test('should render the comment item successfully', () => {
    const comment = comments[1];
    const { container } = render(
      <CommentItem comment={comment} onUpdate={mockUpdateFunction} />,
    );
    expect(container.querySelector('.content')?.textContent).toEqual(comment.message);
    expect(container.querySelector('.edit-button')).not.toBeNull();
  });

  test('should render form when clicking edit button', () => {
    const comment = comments[1];
    render(
      <CommentItem comment={comment} onUpdate={mockUpdateFunction} />,
    );
    fireEvent.click(screen.getByTestId('edit-button'));

    expect(screen.getByTestId('comment-update')).toBeInTheDocument();
  });
});
