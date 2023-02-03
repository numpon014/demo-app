import React, { useState } from 'react';
import {
  Button, Form, Input, List,
} from 'antd';
import uuid from 'react-uuid';
import { ICommentDto } from '../../../dto/comment.dto';
import CommentItem from '../../../components/CommentItem';

function HomePage() {
  const { TextArea } = Input;
  const [comments, setComments] = useState<ICommentDto[]>([
    { message: 'comment1', id: uuid() },
    { message: 'comment2', id: uuid() },
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
    <div>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="comment"
          name="message"
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
          <TextArea />
        </Form.Item>
        <Button
          type="primary"
          block
          htmlType="submit"
        >
          Add Comment
        </Button>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment: ICommentDto) => (
          <List.Item>
            <CommentItem key={comment.id} comment={comment} onUpdate={onUpdated} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default HomePage;
