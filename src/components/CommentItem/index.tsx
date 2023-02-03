import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CommentForm from '../CommentForm';
import { ICommentDto } from '../../dto/comment.dto';
import { Wrapper } from './index.style';

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
    <Wrapper>
      <div style={{ display: (!showForm ? 'block' : 'none') }}>
        <Button
          className="edit-button"
          icon={<EditOutlined />}
          onClick={onClick}
          size="small"
        >
          Edit
        </Button>
        <div className="content">{comment.message}</div>
      </div>
      <Row>
        <Col span={24}>
          <div style={{ display: (!showForm ? 'none' : 'block') }}>
            <CommentForm onFinish={onFinish} comment={comment} onCancel={toggleForm} />
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default CommentItem;
