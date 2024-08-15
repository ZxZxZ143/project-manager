// libs
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, H4 } from '@blueprintjs/core';
// components
import Comment from 'components/layout/TaskDetail/CommentSection/Comment';
import FormControl from 'components/shared/Form';
import { AppToaster } from 'components/shared/Toaster';
// types
import type { CommentFormType } from 'components/layout/TaskDetail/CommentSection/type';
// config
import { CommentFormInitialState } from 'components/layout/TaskDetail/CommentSection/config';
// hooks
import { useAddCommentMutation } from 'store/api/task';
// store
import type { CommentType } from 'store/api/type';

type CommentSectionProps = {
  comments: CommentType[]
};

const TaskDetailCommentSection:FC<CommentSectionProps> = ({ comments }) => {
  const { handleSubmit, control, reset } = useForm<CommentFormType>({
    defaultValues: CommentFormInitialState,
  });
  const [addComment] = useAddCommentMutation();
  const { taskId } = useParams();

  const onSubmit = async (values: CommentFormType) => {
    if (values.comment.trim() === '') {
      return;
    }

    try {
      const res = await addComment({ taskId, comment: values.comment.trim() });

      if (res.error) {
        throw new Error();
      } else {
        reset();
        (await AppToaster).show({ message: 'Сообщение добавлено', intent: 'success' });
      }
    } catch {
      (await AppToaster).show({ message: 'Произошла ошибка', intent: 'danger' });
    }
  };

  return (
    <div className="comment-section">
      <H4>Комментарии:</H4>
      <div>
        {
            comments.map(({
              text, author, createdAt, id,
            }) => (
              <Comment key={id} author={author} comment={text} date={createdAt} />
            ))
              }
      </div>
      <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="comment"
          render={({ field }) => (
            <FormControl autoResize fill placeholder="Оставьте свой комментарий..." type="textarea" {...field} />
          )}
          rules={{
            required: true,
          }}
        />
        <Button endIcon="send-message" intent="primary" text="Отправить" type="submit" variant="solid" />
      </form>
    </div>
  );
};

export default TaskDetailCommentSection;
