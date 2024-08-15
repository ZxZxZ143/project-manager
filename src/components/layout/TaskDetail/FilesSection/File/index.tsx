// libs
import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
// components
import FileConfirmDialog from 'components/layout/TaskDetail/FilesSection/File/ConfirmDialog';
import { AppToaster } from 'components/shared/Toaster';
// hooks
import { useDeleteFileMutation, useDownloadFileQuery } from 'store/api/task';
// store
import type { FileType } from 'store/api/type';

type FileProps = FileType;

const File:FC<FileProps> = ({ filename, uploadedAt, id }) => {
  const formatter = Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const { data, isSuccess, isLoading } = useDownloadFileQuery(filename);
  const [deleteFile] = useDeleteFileMutation();
  const { taskId } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const toggleConfirm = () => {
    setIsConfirmOpen((prevState) => !prevState);
  };

  const downloadFile = () => {
    if (isSuccess && data) {
      const url = data;
      const link = document.createElement('a');

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const deleteFileHandler = async () => {
    toggleConfirm();
    try {
      const res = await deleteFile({ taskId, fileId: id });

      if (res.error) {
        throw new Error();
      } else {
        (await AppToaster).show({ message: 'Файл удален', intent: 'success' });
      }
    } catch {
      (await AppToaster).show({ message: 'Произошла ошибка', intent: 'danger' });
    }
  };

  const renderFile = () => {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return (
          <iframe
            className="frame"
            height="600px"
            src={data}
            title={filename}
            width="100%"
          />
        );

      case 'jpg':
        return (
          <img
            alt={filename}
            className="file-image"
            src={data}
          />
        );

      case 'jpeg':
        return (
          <img
            alt={filename}
            className="file-image"
            src={data}
          />
        );

      case 'png':
        return (
          <img
            alt={filename}
            className="file-image"
            src={data}
          />
        );

      case 'webp':
        return (
          <img
            alt={filename}
            className="file-image"
            src={data}
          />
        );

      case 'gif':
        return (
          <img
            alt={filename}
            className="file-image"
            src={data}
          />
        );

      case 'txt':
        return (
          <iframe
            className="frame"
            height="400px"
            src={data}
            title={filename}
            width="100%"
          />
        );

      case 'md':
        return (
          <iframe
            className="frame"
            height="400px"
            src={data}
            title={filename}
            width="100%"
          />
        );

      default: return null;
    }
  };

  return (
    <div className="file">
      <p>{formatter.format(new Date(uploadedAt))}</p>
      <Button
        className={isLoading ? 'bp6-skeleton' : ''}
        icon="download"
        intent="success"
        onClick={downloadFile}
        text={filename}
        variant="outlined"
      />
      <Button
        className={isLoading ? 'bp6-skeleton' : ''}
        icon="delete"
        intent="danger"
        onClick={toggleConfirm}
        text="Удалить файл"
        variant="outlined"
      />
      <FileConfirmDialog deleteFile={deleteFileHandler} isOpen={isConfirmOpen} onClose={toggleConfirm} />
      {
        renderFile()
      }
    </div>
  );
};

export default File;
