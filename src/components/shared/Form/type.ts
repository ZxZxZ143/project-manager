// libs
import type { ChangeEvent } from 'react';
import type { UseControllerProps } from 'react-hook-form';
import type { Locale } from 'date-fns';

type BaseFormProps = {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
} & UseControllerProps;

export type TextInputProps = {
  type: 'text';
  additionalType?: 'text' | 'password' | 'number' | 'search';
} & BaseFormProps;

export type DatePickerProps = {
  type: 'date';
  clearButtonText?: string;
  defaultValue?: string;
  minDate?: Date;
  maxDate?: Date;
  highlightCurrentDay?: boolean;
  locale?: Locale;
} & BaseFormProps;

export type TextAreaProps = {
  type: 'textarea';
  autoResize?: boolean;
  fill?: boolean;
} & BaseFormProps;

export type FileInputProps = {
  type: 'file';
  buttonText?: string;
  text?: string;
  fill?: boolean;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & BaseFormProps;

export type FormControlProps = TextInputProps | DatePickerProps | TextAreaProps | FileInputProps;
