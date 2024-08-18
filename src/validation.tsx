import * as yup from 'yup';
import { MAX_FILE_SIZE } from './Constants';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be latin uppercase')
    .required('Name is a required field'),
  age: yup
    .number()
    .min(1, 'Age must be positive')
    .required('Age is a required field'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is a required field'),
  password: yup
    .string()
    .matches(/[A-Z]/, 'One latin uppercase letter required')
    .matches(/[a-z]/, 'One latin lowercase letter required')
    .matches(/\d/, 'One number required')
    .matches(/[@$!%*?&#]/, 'One special character required')
    .required('Password is a required field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: yup.string().required('Gender is a required field'),
  picture: yup
    .string()
    .nullable()
    .test('fileSize', 'File too large', (value) => {
      if (!value) return true;
      try {
        const base64Data = value.split(',')[1];
        const binaryString = atob(base64Data);
        const binaryLen = binaryString.length;
        const fileSize = binaryLen * (3 / 4);
        return fileSize <= MAX_FILE_SIZE;
      } catch {
        return false;
      }
    }),
  country: yup.string().required('Country is a required field'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});
