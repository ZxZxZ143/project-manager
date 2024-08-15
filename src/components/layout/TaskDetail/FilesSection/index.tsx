// libs
import { type FC } from 'react';
import { H4 } from '@blueprintjs/core';
// components
import File from 'components/layout/TaskDetail/FilesSection/File';
import FileForm from 'components/layout/TaskDetail/FilesSection/FileForm';
// types
import type { FileType } from 'store/api/type';

type FilesSectionProps = {
  files: FileType[];
};

const FilesSection:FC<FilesSectionProps> = ({ files }) => (
  <div className="files-section">
    <H4>Приложения:</H4>
    <FileForm />
    <div className="files-container">
      {
              files.map((file) => (
                <File key={file.id} filename={file.filename} id={file.id} originalName={file.originalName} uploadedAt={file.uploadedAt} />
              ))
          }
    </div>
  </div>
);

export default FilesSection;
