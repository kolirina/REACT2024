import * as yup from 'yup';
import { MAX_FILE_SIZE } from './Constants';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required(),
  age: yup.number().min(1, 'Age must be positive').required(),
  email: yup.string().email('Invalid email format').required(),
  password: yup
    .string()
    .matches(/[A-Z]/, 'One uppercase required')
    .matches(/[a-z]/, 'One lowercase required')
    .matches(/\d/, 'One number required')
    .matches(/[@$!%*?&#]/, 'One special character required')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: yup.string().required('Gender is required'),
  picture: yup
    .string()
    .nullable()
    .test('fileSize', 'File too large', (value) => {
      if (!value) return true; // Skip validation if no file
      try {
        const base64Data = value.split(',')[1];
        const binaryString = atob(base64Data);
        const binaryLen = binaryString.length;
        const fileSize = binaryLen * (3 / 4); // Approximate size in bytes
        return fileSize <= MAX_FILE_SIZE;
      } catch {
        return false; // Return false if there's an error in decoding
      }
    }),
  country: yup.string().required('Country is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});
