import React from 'react';
import {
  Button, Form, FormInstance, Input,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { ICommentDto } from 'dto/comment.dto';

interface CommentFormProp {
  onFinish: (data: ICommentDto) => void
  onCancel?: () => void
  comment?: ICommentDto
}

function CommentForm({ comment, onFinish, onCancel } : CommentFormProp) {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const formRef = React.useRef<FormInstance>(null);

  const onSubmit = (data: ICommentDto) => {
    onFinish(data);
    formRef.current?.resetFields();
  };

  return (
    <Form
      ref={formRef}
      name="comment"
      initialValues={{ message: comment?.message, id: comment?.id }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="message"
        rules={[{ required: true, message: 'Please input your comment!' }]}
      >
        <TextArea rows={3} data-testid="message-textarea" />
      </Form.Item>
      <Form.Item
        name="id"
        style={{ display: 'none' }}
      >
        <Input type="text" data-testid="message-id" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          data-testid="submit-button"
        >
          {(comment ? t('comment.form.update_button') : t('comment.form.add_button'))}
        </Button>
        {' '}
        {
          comment && (
            <Button onClick={onCancel} className="cancel-button">{t('comment.form.cancel_button')}</Button>
          )
        }
      </Form.Item>
    </Form>
  );
}

export default CommentForm;
