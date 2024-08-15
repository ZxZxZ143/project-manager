// libs
import { forwardRef } from 'react';
// types
import type { FileInputProps } from 'components/shared/Form/type';

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => (
  <input
    {...props}
    ref={ref}
    type="file"
  />
));

export default FileInput;
