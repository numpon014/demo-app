import uuid from 'react-uuid';
import { render } from '@testing-library/react';
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

  const mockUpdateFunction = () => {};

  test('renders successfully', () => {
    const comment = comments[1];
    const { container } = render(
      <CommentItem comment={comment} onUpdate={mockUpdateFunction} />,
    );
    expect(container.querySelector('.content')?.textContent).toEqual(comment.message);
    expect(container.querySelector('.edit-button')).not.toBeNull();
  });
});
