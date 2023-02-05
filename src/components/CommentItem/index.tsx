import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ICommentDto } from 'dto/comment.dto';
import CommentForm from '../CommentForm';
import { Wrapper } from './index.style';

interface CommentItemProp {
  comment: ICommentDto,
  onUpdate: (data: ICommentDto) => void
}

function CommentItem({ comment, onUpdate }: CommentItemProp) {
  const { t } = useTranslation();
  const { Paragraph } = Typography;
  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const onClick = () => {
    toggleForm();
  };

  const onFinish = (data: ICommentDto) => {
    onUpdate(data);
    toggleForm();
  };

  return (
    <Wrapper>
      <div style={{ display: (!showForm ? 'block' : 'none') }}>
        <Button
          className="edit-button"
          data-testid="edit-button"
          icon={<EditOutlined />}
          onClick={onClick}
          size="small"
        >
          {t('comment.edit_button')}
        </Button>
        <Paragraph className="content">
          {comment.message}
        </Paragraph>
      </div>
      {
        (showForm) && (
          <div data-testid="comment-update">
            <CommentForm onFinish={onFinish} comment={comment} onCancel={toggleForm} />
          </div>
        )
      }
    </Wrapper>
  );
}

export default CommentItem;
