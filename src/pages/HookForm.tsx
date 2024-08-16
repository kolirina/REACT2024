import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { formSchema } from '../validation';
import { setFormData } from '../store';
import { useNavigate } from 'react-router-dom';

interface FormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  // acceptTerms: boolean;
  picture?: string | null;
  // country: string;
}

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState<string | null>(null); // Picture as Base64 string
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
  });

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const pictureFile = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPicture(base64String); // Store Base64 string in state
      };

      reader.readAsDataURL(pictureFile); // Convert file to Base64 string
    }
  };

  const onSubmit = (data: FormInputs) => {
    // Update data with picture from state
    const formData = {
      ...data,
      picture, // Use the picture from state
    };

    // Dispatch to Redux
    dispatch(setFormData(formData));

    // Navigate
    console.log('Data submitted successfully, navigating to home.', formData);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} id="name" />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age</label>
      <input type="number" {...register('age')} id="age" />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email</label>
      <input {...register('email')} id="email" />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} id="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor="confirmPassword">Confirm your password</label>
      <input
        type="password"
        {...register('confirmPassword')}
        id="confirmPassword"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label>Gender</label>
      <div>
        <label>
          <input type="radio" value="male" {...register('gender')} />
          Male
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="female" {...register('gender')} />
          Female
        </label>
      </div>
      {errors.gender && <p>{errors.gender.message}</p>}

      <label htmlFor="picture">Upload Picture</label>
      <input
        className="fileInput"
        id="picture"
        type="file"
        accept=".jpeg, .png"
        onChange={handlePictureChange}
      />
      {picture && <p>{picture.split(',')[0]}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default HookForm;
