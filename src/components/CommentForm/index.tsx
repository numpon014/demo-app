import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { ICommentDto } from '../../dto/comment.dto';

interface CommentFormProp {
  onFinish: (data: ICommentDto) => void
  onCancel?: () => void
  comment?: ICommentDto
}

function CommentForm({ comment, onFinish, onCancel } : CommentFormProp) {
  return (
    <Form
      name="comment"
      initialValues={{ message: comment?.message, id: comment?.id }}
      onFinish={onFinish}
    >
      <Form.Item
        name="message"
        rules={[{ required: true, message: 'Please input your comment!' }]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        name="id"
        style={{ display: 'none' }}
      >
        <Input type="text" placeholder="Add you comment" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          {(comment ? 'Update' : 'Add')}
        </Button>
        {' '}
        {
          comment && (
            <Button
              onClick={onCancel}
            >
              Cancel
            </Button>
          )
        }
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
