import React, { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CommentForm from '../CommentForm';
import { ICommentDto } from '../../dto/comment.dto';

interface CommentItemProp {
  comment: ICommentDto,
  onUpdate: (data: ICommentDto) => void
}

function CommentItem({ comment, onUpdate }: CommentItemProp) {
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
    <div>
      <div>{comment.message}</div>
      <Button icon={<EditOutlined />} onClick={onClick} size="small">Edit</Button>
      <div style={{ display: (!showForm ? 'none' : 'block') }}>
        <CommentForm onFinish={onFinish} comment={comment} />
      </div>
    </div>
  );
}

export default CommentItem;
