// libs
import { forwardRef, type Ref } from 'react';
// components
import DatePicker from 'components/shared/Form/DatePicker';
import FileInput from 'components/shared/Form/FileInput';
import TextArea from 'components/shared/Form/TextArea';
import TextInput from 'components/shared/Form/TextInput';
// types
import type { FormControlProps } from 'components/shared/Form/type';

const FormControl = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormControlProps>(({ type, ...props }, ref) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return <TextInput ref={ref as Ref<HTMLInputElement>} {...props} type={type} />;

      case 'date':
        return <DatePicker ref={ref as Ref<HTMLInputElement>} {...props} type={type} />;

      case 'textarea':
        return <TextArea ref={ref as Ref<HTMLTextAreaElement>} {...props} type={type} />;

      case 'file':
        return <FileInput ref={ref as Ref<HTMLInputElement>} {...props} type={type} />;

      default: return null;
    }
  };

  return (
    <>
      {renderInput()}
    </>
  );
});

export default FormControl;
