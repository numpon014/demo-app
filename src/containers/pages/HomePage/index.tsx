import React, { useState } from 'react';
import {
  Button, Col, List, Row, Typography,
} from 'antd';
import uuid from 'react-uuid';
import { PageWrapper } from './index.style';
import { ICommentDto } from '../../../dto/comment.dto';
import CommentItem from '../../../components/CommentItem';
import CommentForm from '../../../components/CommentForm';

function HomePage() {
  const { Title } = Typography;
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

  const commentListAction = () => (
    <div className="list-action-wrapper">
      {
          (currentShowItem < comments.length) && (
            <Button className="show-more-button" onClick={onLoadMore} size="small">Show More</Button>
          )
        }
      {
          ((currentShowItem === comments.length) && (currentShowItem !== initialShowItem)) && (
            <Button className="hide-button" onClick={onHideComment} size="small">Hide Comment</Button>
          )
        }
    </div>
  );

  return (
    <PageWrapper>
      <Row className="new-comment-form-wrapper">
        <Col span={24}>
          <Title level={3}>Create new comment</Title>
          <CommentForm onFinish={onFinish} isFormReset />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            header={<div>{`Total comment: ${comments.length}`}</div>}
            footer={commentListAction()}
            itemLayout="horizontal"
            bordered
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
