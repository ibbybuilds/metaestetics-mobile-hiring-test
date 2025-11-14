import * as Yup from 'yup';

const EMAIL_REQUIRED = 'Email is required';
const EMAIL_INVALID = 'Invalid email address';
const PASSWORD_REQUIRED = 'Password is required';
const PASSWORD_MIN = 'Password must be at least 8 characters';
const CONFIRM_PASSWORD_REQUIRED = 'Confirm password is required';
const CONFIRM_PASSWORD_MATCH = 'Passwords must match';
const PHONE_REQUIRED = 'Phone number is required';
const PHONE_INVALID = 'Phone number must be 6 to 15 digits';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL_INVALID)
    .required(EMAIL_REQUIRED),
  password: Yup.string()
    .min(8, PASSWORD_MIN)
    .required(PASSWORD_REQUIRED),
});

export const registerStep1ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL_INVALID)
    .required(EMAIL_REQUIRED),
  password: Yup.string()
    .min(8, PASSWORD_MIN)
    .required(PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], CONFIRM_PASSWORD_MATCH)
    .required(CONFIRM_PASSWORD_REQUIRED),
});

export const registerStep1EmailPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL_INVALID)
    .required(EMAIL_REQUIRED),
  password: Yup.string()
    .min(8, PASSWORD_MIN)
    .required(PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], CONFIRM_PASSWORD_MATCH)
    .required(CONFIRM_PASSWORD_REQUIRED),
});

export const registerStep2ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{6,15}$/, PHONE_INVALID)
    .required(PHONE_REQUIRED),
  dateOfBirth: Yup.string()
    .required('Date of birth is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Please select a gender')
    .required('Gender is required'),
});

export const editProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{6,15}$/, PHONE_INVALID)
    .required(PHONE_REQUIRED),
  dateOfBirth: Yup.string()
    .required('Date of birth is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Please select a gender')
    .required('Gender is required'),
});

