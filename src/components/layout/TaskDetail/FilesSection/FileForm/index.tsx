// libs
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
// types
import type { FileFormType } from 'components/layout/TaskDetail/FilesSection/FileForm/type';
// components
import { AppToaster } from 'components/shared/Toaster';
// config
import { FileFormInitialValue } from 'components/layout/TaskDetail/FilesSection/FileForm/config';
// hooks
import { useUploadFileMutation } from 'store/api/task';

const FileForm:FC = () => {
  const { handleSubmit, control, reset } = useForm<FileFormType>({
    defaultValues: FileFormInitialValue,
  });
  const [uploadFile] = useUploadFileMutation();
  const { taskId } = useParams();

  const onSubmit = async (value: FileFormType) => {
    try {
      const res = await uploadFile({ taskId, file: value.file });

      if (res.error) {
        throw new Error();
      } else {
        reset();
        (await AppToaster).show({ message: 'Файл загружен', intent: 'success' });
      }
    } catch {
      (await AppToaster).show({ message: 'Произошла ошибка', intent: 'danger' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                field.onChange(file);
              }
            }}
            type="file"
          />
        )}
        rules={{
          required: true,
        }}
      />
      <Button icon="send-to" intent="primary" text="Загрузить" type="submit" />
    </form>
  );
};

export default FileForm;
