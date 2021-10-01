import * as Yup from 'yup';

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const SharedValidationSchema = {
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email không hợp lệ'),

  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),

  password: (msg: string) =>
    Yup.string().min(6, 'Mật khẩu ít nhất phải có 6 kí tự').required(msg),
  confirmPassword: (fieldName: string) =>
    Yup.string()
      .oneOf([Yup.ref(fieldName), null], 'Mật khẩu không trùng khớp')
      .required('Vui lòng xác nhận lại mật khẩu'),
};
