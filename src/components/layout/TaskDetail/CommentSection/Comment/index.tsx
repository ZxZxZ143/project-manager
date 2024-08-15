// libs
import { type FC } from 'react';
import { EntityTitle } from '@blueprintjs/core';

type CommentProps = {
  comment: string;
  author: string;
  date: string;
};

const formatter = Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const Comment:FC<CommentProps> = ({ comment, author, date }) => (
  <div className="comment">
    <div className="comment-header">
      <EntityTitle icon="user" title={author} />
      <p>{formatter.format(new Date(date))}</p>
    </div>
    <p className="comment-text">{comment}</p>
  </div>
);

export default Comment;
