import React, { useState } from 'react';
import {
  Button, Col, List, Row, Typography,
} from 'antd';
import uuid from 'react-uuid';
import CommentForm from 'components/CommentForm';
import CommentItem from 'components/CommentItem';
import { useTranslation } from 'react-i18next';
import { ICommentDto } from 'dto/comment.dto';
import { PageWrapper } from './index.style';

function HomePage() {
  const { Title } = Typography;
  const { t } = useTranslation();
  const initialShowItem = 3;
  const showMoreItemPerTime = 3;
  const [currentShowItem, setCurrentShowItem] = useState<number>(initialShowItem);
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

  const onLoadMore = () => {
    let showItems = currentShowItem + showMoreItemPerTime;

    if (showItems > comments.length) {
      showItems = comments.length;
    }

    setCurrentShowItem(showItems);
  };

  const onHideComment = () => {
    setCurrentShowItem(initialShowItem);
  };

  const commentListFooter = () => (
    <div className="comment-list-footer">
      {
          (currentShowItem < comments.length) && (
            <Button className="show-more-button" onClick={onLoadMore} size="small">{t('comment.show_more')}</Button>
          )
        }
      {
          ((currentShowItem === comments.length) && (currentShowItem !== initialShowItem)) && (
            <Button className="hide-button" onClick={onHideComment} size="small">{t('comment.hide_comment')}</Button>
          )
        }
    </div>
  );

  return (
    <PageWrapper>
      <Row className="new-comment-form-wrapper">
        <Col span={24}>
          <Title level={3}>{t('comment.form.title')}</Title>
          <CommentForm onFinish={onFinish} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            bordered
            header={<div className="comment-list-header">{t('comment.total', { total: comments.length })}</div>}
            footer={commentListFooter()}
            itemLayout="horizontal"
            dataSource={comments.slice(0, currentShowItem)}
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
