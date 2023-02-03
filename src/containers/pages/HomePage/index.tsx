import React, { useState } from 'react';
import { Col, List, Row } from 'antd';
import uuid from 'react-uuid';
import { PageWrapper } from './index.style';
import { ICommentDto } from '../../../dto/comment.dto';
import CommentItem from '../../../components/CommentItem';
import CommentForm from '../../../components/CommentForm';

function HomePage() {
  const [comments, setComments] = useState<ICommentDto[]>([
    { message: 'This is comment 1', id: uuid() },
    { message: 'This is comment 2', id: uuid() },
    { message: 'This is comment 3', id: uuid() },
  ]);

  const onFinish = (data: ICommentDto) => {
    const newComments = {
      message: data.message,
      id: uuid(),
    };

    setComments((prev) => [{ ...newComments }, ...prev]);
  };

  const onUpdated = (data: ICommentDto) => {
    const newComments = comments;
    const foundIndex = comments.findIndex((x) => x.id === data.id);
    newComments[foundIndex] = {
      message: data.message,
      id: data.id,
    };

    setComments(() => [...newComments]);
  };

  return (
    <PageWrapper>
      <Row className="new-comment-form-wrapper">
        <Col span={24}>
          <CommentForm onFinish={onFinish} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment: ICommentDto) => (
              <List.Item>
                <CommentItem key={comment.id} comment={comment} onUpdate={onUpdated} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageWrapper>
  );
}

export default HomePage;
