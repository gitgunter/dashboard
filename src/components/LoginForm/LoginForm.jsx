import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useMutation } from 'react-query';

import { useAuth } from '@context/AuthContext';
import { Input } from '../Input/Input';
import { signIn } from '@services/authService';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';

import css from './LoginForm.module.css';
import Spinner from '@components/common/Spinner/Spinner';

export const LoginForm = () => {
  const { login } = useAuth();

  const ERROR_MESSAGES = {
    EMAIL_NOT_FOUND:
      'No se encontró un usuario registrado con este correo electrónico.',
    INCORRECT_PASSWORD: 'La contraseña proporcionada es incorrecta.',
    UNKNOWN_ERROR:
      'Ocurrió un error desconocido. Por favor, inténtalo de nuevo más tarde.',
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

  const loginMutation = useMutation(signIn, {
    onError: (error) => {
      handleErrors(error, formik.setErrors);
    },
    onSuccess: (data) => {
      const token = data.userToken;
      login(token);
    },
  });

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
    onSubmit: async (loginFormData) => {
      loginMutation.mutate(loginFormData);
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
          {formik.errors.password && formik.touched.password && (
            <InputError>{formik.errors.password}</InputError>
          )}
        </div>
      </div>
      <TeodriveButton
        type='submit'
        width='100%'
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? (
          <>
            <Spinner size={20} />
            Validando...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </TeodriveButton>
    </form>
  );
};

export const InputError = ({ children }) => {
  return <span className={css.InputError}>{children}</span>;
};
