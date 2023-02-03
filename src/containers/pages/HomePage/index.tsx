import React, { useState } from 'react';
import {
  Button, Col, Form, Input, List, Row,
} from 'antd';
import uuid from 'react-uuid';
import { PageWrapper } from './index.style';
import { ICommentDto } from '../../../dto/comment.dto';
import CommentItem from '../../../components/CommentItem';

function HomePage() {
  const { TextArea } = Input;
  const [comments, setComments] = useState<ICommentDto[]>([
    { message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam mollitia, nemo asperiores vero ab quam repellendus labore dicta! Recusandae, nulla.', id: uuid() },
    { message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam mollitia, nemo asperiores vero ab quam repellendus labore dicta! Recusandae, nulla.', id: uuid() },
    { message: 'comment3', id: uuid() },
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
          <Form
            className="comment-form"
            name="comment"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="message"
              rules={[{ required: true, message: 'Please input your comment!' }]}
            >
              <TextArea placeholder="Add you comment" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 6 }}>
              <Button
                type="primary"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
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
