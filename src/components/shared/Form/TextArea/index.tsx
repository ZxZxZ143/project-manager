// libs
import { forwardRef } from 'react';
import { TextArea as BlueprintTextArea } from '@blueprintjs/core';
// types
import type { TextAreaProps } from 'components/shared/Form/type';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
  <BlueprintTextArea inputRef={ref} {...props} />
));

export default TextArea;
