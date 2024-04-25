import axios from 'axios';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../Input/Input';

import css from './LoginForm.module.css';

export const LoginForm = () => {
  const { login } = useAuth();

  const ERROR_MESSAGES = {
    EMAIL_NOT_FOUND: 'No se encontró un usuario registrado con este correo electrónico.',
    INCORRECT_PASSWORD: 'La contraseña proporcionada es incorrecta.',
    UNKNOWN_ERROR: 'Ocurrió un error desconocido. Por favor, inténtalo de nuevo más tarde.',
  };
  
  const handleErrors = (error, setErrors) => {
    const errMsg = error.response?.data?.message;
    if (errMsg === ERROR_MESSAGES.EMAIL_NOT_FOUND) {
      setErrors({ email: errMsg });
    } else if (errMsg === ERROR_MESSAGES.INCORRECT_PASSWORD) {
      setErrors({ password: errMsg });
    } else {
      setErrors({ general: ERROR_MESSAGES.UNKNOWN_ERROR });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object({
      email: string()
        .email('Introduce una dirección de correo electrónico válida')
        .matches(
          /^\S+@\S+\.\S+$/,
          'Introduce una dirección de correo electrónico válida'
        )
        .required('Introduce un correo electrónico'),
      password: string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('Introduce una contraseña'),
    }),
    onSubmit: async (loginFormData, { setErrors }) => {
      try {
        const response = await axios.post(
          'https://api.teodrive.com/auth/login',
          { email: loginFormData.email, password: loginFormData.password }
        );

        const token = response.data.userToken;
        login(token);
      } catch (error) {
        handleErrors(error, setErrors);
      }
    },
  });

  return (
    <form className={css.LoginForm} onSubmit={formik.handleSubmit} noValidate>
      <div className={css.formInputWrapper}>
        <div className={css.errorWrapper}>
          <Input
            type='email'
            name='email'
            id='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='Correo electrónico'
            error={formik.errors.email && formik.touched.email}
          />
          {formik.errors.email && formik.touched.email && (
            <InputError>{formik.errors.email}</InputError>
          )}
        </div>
        <div className={css.errorWrapper}>
          <Input
            type='password'
            name='password'
            id='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder='Contraseña'
            error={formik.errors.password && formik.touched.password}
          />
          {formik.errors.password && formik.touched.password && 
            <InputError>{formik.errors.password}</InputError>
          }
        </div>
      </div>
      <Button />
    </form>
  );
};

export const Button = () => {
  const styles = {
    cursor: 'pointer',
    userSelect: 'none',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'baseline',
    backgroundColor: '#1676fe',
    borderRadius: '0.75rem',
    color: '#fff',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    padding: '0.625rem 0.875rem',
    width: '100%',
  };

  return (
    <button type='submit' style={styles}>
      Iniciar sesión
    </button>
  );
};

export const InputError = ({ children }) => {
  return <span className={css.InputError}>{children}</span>;
};
