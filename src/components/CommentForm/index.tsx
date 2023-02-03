import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { ICommentDto } from '../../dto/comment.dto';

interface CommentFormProp {
  onFinish: (data: ICommentDto) => void
  comment: ICommentDto
}

function CommentForm({ comment, onFinish } : CommentFormProp) {
  return (
    <Form
      name="comment"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ message: comment.message, id: comment.id }}
      onFinish={onFinish}
    >
      <Form.Item
        label="comment"
        name="message"
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        name="id"
        style={{ display: 'none' }}
      >
        <Input type="text" />
      </Form.Item>
      <Button
        type="primary"
        block
        htmlType="submit"
      >
        Update
      </Button>
    </Form>
  );
}

export default CommentForm;
