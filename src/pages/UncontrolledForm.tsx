import React from 'react';

// import { setFormData } from '../store';

const UncontrolledForm: React.FC = () => {
  //   const dispatch = useDispatch();
  //   const nameRef = useRef<HTMLInputElement>(null);
  //   const ageRef = useRef<HTMLInputElement>(null);
  //   const emailRef = useRef<HTMLInputElement>(null);
  //   const passwordRef = useRef<HTMLInputElement>(null);
  //   const genderRef = useRef<HTMLInputElement>(null);
  //   const termsRef = useRef<HTMLInputElement>(null);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (
  //       nameRef.current &&
  //       ageRef.current &&
  //       emailRef.current &&
  //       passwordRef.current &&
  //       genderRef.current &&
  //       termsRef.current
  //     ) {
  //       dispatch(
  //         setFormData({
  //           name: nameRef.current.value,
  //           age: Number(ageRef.current.value),
  //           email: emailRef.current.value,
  //           password: passwordRef.current.value,
  //           gender: genderRef.current.value,
  //           //   acceptTerms: termsRef.current.checked,
  //           picture: '', // Handle picture upload
  //           //   country: '', // Handle country selection
  //         }),
  //       );
  //     }
  //   };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
        {/* Repeat for other fields */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default UncontrolledForm;
