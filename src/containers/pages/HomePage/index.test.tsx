import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { act } from 'react-dom/test-utils';
import Page from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn((key) => key) }),
}));

describe('home page screen', () => {
  beforeEach(() => {
    render(
      <Router>
        <Page />
      </Router>,
    );
  });

  describe('render the page and comments successfully', () => {
    test('renders home page successfully', () => {
      expect(true);
    });

    test('should render the comments correctly', () => {
      const comments = screen.getAllByTestId('comment-item');

      const showMoreButton = screen.queryByTestId('show-more-button');
      const hideButton = screen.queryByTestId('hide-button');

      expect(comments).toHaveLength(3);
      expect(showMoreButton).toBeInTheDocument();
      expect(hideButton).toBeNull();
    });

    test('should render the comments correctly when click show more and hide button', async () => {
      expect(screen.getAllByTestId('comment-item')).toHaveLength(3);

      // Show comments
      const showMoreButton = screen.getByTestId('show-more-button');
      await act(async () => {
        fireEvent.click(showMoreButton);
      });
      expect(screen.getAllByTestId('comment-item')).toHaveLength(4);

      // Hide comments
      const hideButton = screen.getByTestId('hide-button');
      await act(async () => {
        fireEvent.click(hideButton);
      });
      expect(screen.getAllByTestId('comment-item')).toHaveLength(3);
    });
  });

  describe('add new comments', () => {
    test('should show new comment successfully after creating new comment', async () => {
      const newMessage = 'this is a new message';
      const submitButton = screen.getByTestId('submit-button');
      const commentMessage = screen.getByTestId('message-textarea');

      await act(async () => {
        fireEvent.change(commentMessage, { target: { value: newMessage } });
      });
      expect(commentMessage.innerHTML).toEqual(newMessage);

      await act(async () => {
        fireEvent.click(submitButton);
      });

      const comments = screen.getAllByTestId('comment-item');
      expect(comments[0].querySelector('.content')?.textContent).toEqual(newMessage);
      expect(screen.getByTestId('comment-total').getAttribute('data-total')).toEqual('5');
    });

    test('should show update comment successfully after updating existing comment', async () => {
      const updateCommentForm = screen.queryByTestId('comment-update');
      expect(updateCommentForm).not.toBeInTheDocument();

      const editButtons = screen.getAllByTestId('edit-button');
      await act(async () => {
        fireEvent.click(editButtons[0]);
      });
      expect(screen.queryByTestId('comment-update')).toBeInTheDocument();

      const newMessage = 'update comment';
      const comments = screen.getAllByTestId('comment-item');
      const commentMessage = comments[0].querySelector("textarea[data-testid='message-textarea']");
      const submitButton = comments[0].querySelector("button[data-testid='submit-button']");

      if (!commentMessage || !submitButton) {
        fail('not found textarea');
      }

      await act(async () => {
        fireEvent.change(commentMessage, { target: { value: newMessage } });
      });
      expect(commentMessage.innerHTML).toEqual(newMessage);

      await act(async () => {
        fireEvent.click(submitButton);
      });
      expect(screen.queryByTestId('comment-update')).not.toBeInTheDocument();
      expect(comments[0].querySelector('.content')?.textContent).toEqual(newMessage);
    });
  });
});
