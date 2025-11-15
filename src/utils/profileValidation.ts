import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  phone: Yup.string().required('Phone is required'),
  dob: Yup.string().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  photo: Yup.string().nullable(),
});
