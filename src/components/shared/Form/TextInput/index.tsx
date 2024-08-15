// libs
import { forwardRef } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
// types
import type { TextInputProps } from 'components/shared/Form/type';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  additionalType, error, label, ...props
}, ref) => (
  <FormGroup helperText={error || ''} intent={error ? 'danger' : 'none'} label={label}>
    <InputGroup inputRef={ref} intent={error ? 'danger' : 'none'} {...props} type={additionalType} />
  </FormGroup>
));

export default TextInput;
