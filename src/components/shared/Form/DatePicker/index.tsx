// libs
import { forwardRef, type Ref } from 'react';
import { DateInput } from '@blueprintjs/datetime';
// types
import type { DatePickerProps } from 'components/shared/Form/type';

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => (
  <DateInput {...props} inputProps={{ inputRef: ref as Ref<HTMLInputElement> }} />
));

export default DatePicker;
