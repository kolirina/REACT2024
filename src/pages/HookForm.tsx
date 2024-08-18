import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { formSchema } from '../validation';
import { addFormData } from '../redux/formSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types';

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState<string | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [passwordStrength, setPasswordStrength] = useState({
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });
  const [passwordScore, setPasswordScore] = useState(0);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);

  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const pictureFile = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPicture(base64String);
      };

      reader.readAsDataURL(pictureFile);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setIsPasswordEntered(password.length > 0);

    const score = {
      hasNumber: /\d/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecialChar: /[@$!%*?&#]/.test(password),
    };

    setPasswordStrength(score);

    const scoreValue = Object.values(score).filter(Boolean).length;
    setPasswordScore(scoreValue);
    console.log('Form is valid:', isValid);
    console.log('Form is submitting:', isSubmitting);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = countries.filter((country: string) =>
      country.toLowerCase().includes(searchValue),
    );
    setFilteredCountries(filtered);
    setValue('country', e.target.value);
  };

  const onSubmit = (data: FormData) => {
    const formData = {
      ...data,
      picture,
    };

    dispatch(addFormData(formData));
    console.log('Form submitted successfully:', formData);
    navigate('/');
  };

  const getPasswordStrengthLabel = () => {
    if (passwordScore === 4) return 'Strong';
    if (passwordScore === 3) return 'Medium';
    if (passwordScore === 2) return 'Weak';
    return 'Very Weak';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input {...register('name')} id="name" />
        <p className="error-message">{errors.name?.message}</p>
      </div>

      <div className="form-field">
        <label htmlFor="age">Age</label>
        <input type="number" {...register('age')} id="age" />
        <p className="error-message">{errors.age?.message}</p>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" />
        <p className="error-message">{errors.email?.message}</p>
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register('password')}
          id="password"
          onChange={handlePasswordChange}
        />
        <p className="error-message">{errors.password?.message}</p>
        {isPasswordEntered && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                fontSize: '12px',
              }}
            >
              Password Strength: {getPasswordStrengthLabel()}
            </p>
            <div
              style={{
                margin: '0 auto',
                width: '70%',
                height: '10px',
                backgroundColor: '#e0e0e0',
                borderRadius: '15px',
                marginBottom: 0,
              }}
            >
              <div
                style={{
                  width: `${(passwordScore / 4) * 100}%`,

                  height: '100%',
                  borderRadius: '15px',
                  backgroundColor:
                    passwordScore === 4
                      ? 'green'
                      : passwordScore === 3
                        ? 'orange'
                        : 'red',
                  transition: 'width 0.3s ease-in-out',
                }}
              ></div>
            </div>
            <ul>
              <li
                style={{
                  color: passwordStrength.hasNumber ? 'green' : 'red',
                  fontSize: '12px',
                }}
              >
                {passwordStrength.hasNumber ? '✔ 1 number' : 'X 1 number'}
              </li>
              <li
                style={{
                  color: passwordStrength.hasUppercase ? 'green' : 'red',
                  fontSize: '12px',
                }}
              >
                {passwordStrength.hasUppercase
                  ? '✔ 1 uppercase letter'
                  : 'X 1 uppercase letter'}
              </li>
              <li
                style={{
                  color: passwordStrength.hasLowercase ? 'green' : 'red',
                  fontSize: '12px',
                }}
              >
                {passwordStrength.hasLowercase
                  ? '✔ 1 lowercase letter'
                  : 'X 1 lowercase letter'}
              </li>
              <li
                style={{
                  color: passwordStrength.hasSpecialChar ? 'green' : 'red',
                  fontSize: '12px',
                }}
              >
                {passwordStrength.hasSpecialChar
                  ? '✔ 1 special character'
                  : 'X 1 special character'}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          id="confirmPassword"
        />
        <p className="error-message">{errors.confirmPassword?.message}</p>
      </div>

      <div className="form-field">
        <label>Gender</label>
        <div className="gender-wrapper">
          <div className="radio-plus-gender">
            <label>
              <input type="radio" value="male" {...register('gender')} /> Male
            </label>
          </div>
          <div>
            <label>
              <input type="radio" value="female" {...register('gender')} />{' '}
              Female
            </label>
          </div>
        </div>

        <p className="error-message">{errors.gender?.message}</p>
      </div>

      <div className="form-field">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          {...register('country')}
          onChange={handleSearch}
          autoComplete="off"
        />
        {filteredCountries.length > 0 && (
          <ul>
            {filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => {
                  setValue('country', country);
                  setFilteredCountries([]);
                }}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
        <p className="error-message">{errors.country?.message}</p>
      </div>

      <div className="form-field">
        <label htmlFor="picture">Upload Picture</label>
        <input
          type="file"
          id="picture"
          accept=".jpeg, .png"
          onChange={handlePictureChange}
        />
        {picture && (
          <img src={picture} alt="Preview" width="100" height="auto" />
        )}
      </div>

      <div className="form-field">
        <label>
          <input type="checkbox" {...register('termsAccepted')} /> I accept the
          Terms and Conditions
        </label>
        <p className="error-message">{errors.termsAccepted?.message}</p>
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
