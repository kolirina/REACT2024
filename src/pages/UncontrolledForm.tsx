import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formSchema } from '../validation';
import { addFormData } from '../redux/formSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types';
import * as yup from 'yup';

const UncontrolledForm: React.FC = () => {
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsAcceptedRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);

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

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || '';
    setIsPasswordEntered(password.length > 0);

    const score = {
      hasNumber: /\d/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecialChar: /[@$!%*?&#]/.test(password),
    };

    setPasswordStrength(score);
    setPasswordScore(Object.values(score).filter(Boolean).length);
  };

  const handleSearch = () => {
    const searchValue = countryRef.current?.value.toLowerCase() || '';
    const filtered = countries.filter((country: string) =>
      country.toLowerCase().includes(searchValue),
    );
    setFilteredCountries(filtered);
  };

  const validateFormData = async (formData: FormData) => {
    try {
      await formSchema.validate(formData, { abortEarly: false });
      return null;
    } catch (error) {
      const validationErrors: Record<string, string> = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
      }
      return validationErrors;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0'),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      country: countryRef.current?.value || '',
      picture,
      termsAccepted: termsAcceptedRef.current?.checked || false,
      gender: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
          ? 'female'
          : '',
    };

    const errors = await validateFormData(formData);

    if (errors) {
      setFormErrors(errors);
      return;
    }

    dispatch(addFormData(formData));

    navigate('/');
  };

  const getPasswordStrengthLabel = () => {
    if (passwordScore === 4) return 'Strong';
    if (passwordScore === 3) return 'Medium';
    if (passwordScore === 2) return 'Weak';
    return 'Very Weak';
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" ref={nameRef} type="text" />
        <p className="error-message">{formErrors.name}</p>
      </div>

      <div className="form-field">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" ref={ageRef} />
        <p className="error-message">{formErrors.age}</p>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" ref={emailRef} type="email" />
        <p className="error-message">{formErrors.email}</p>
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          onChange={handlePasswordChange}
        />
        <p className="error-message">{formErrors.email}</p>
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
                marginBottom: '3px',
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
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        <p className="error-message">{formErrors.confirmPassword}</p>
      </div>

      <div className="form-field">
        <label>Gender</label>
        <div className="gender-wrapper">
          <label>
            <input type="radio" ref={maleRef} name="gender" value="male" /> Male
          </label>
          <label>
            <input type="radio" ref={femaleRef} name="gender" value="female" />{' '}
            Female
          </label>
        </div>

        <p className="error-message">{formErrors.gender}</p>
      </div>

      <div className="form-field">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          ref={countryRef}
          onChange={handleSearch}
          autoComplete="off"
        />
        {filteredCountries.length > 0 && (
          <ul>
            {filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => {
                  countryRef.current!.value = country;
                  setFilteredCountries([]);
                }}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
        <p className="error-message">{formErrors.country}</p>
      </div>

      <div className="form-field">
        <label htmlFor="picture">Upload Picture</label>
        <input type="file" id="picture" onChange={handlePictureChange} />
        {picture && <img src={picture} alt="Preview" width="100" />}
      </div>

      <div className="form-field">
        <label>
          <input type="checkbox" ref={termsAcceptedRef} /> Accept terms and
          conditions
        </label>
        <p className="error-message">{formErrors.termsAccepted}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
