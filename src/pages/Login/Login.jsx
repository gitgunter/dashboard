import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@context/AuthContext';
import { LoginForm } from '@components/LoginForm/LoginForm';
import css from './Login.module.css';

import loginBackground from '@assets/images/loginbg.png';
import teodrive from '@assets/images/teodriveBrandLogo.svg';

function Login() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <main>
      <Helmet>
        <title>Iniciar sesión</title>
        <meta
          name='description'
          content='Accede a tu cuenta para empezar a practicar para tu examen'
        />
        <link rel='canonical' href='https://app.teodrive.com/login' />
      </Helmet>
      <section className={css.Login}>
        <div className={css.leftSideLogin}>
          <div className={css.formHeader}>
            <h1 className={css.formTitle}>Acceder</h1>
            <p className={css.formSubtitle}>Por favor, introduce tus datos</p>
          </div>
          <LoginForm />
          <div className={css.registerRedirect}>
            <span>¿No tienes una cuenta?</span>
            <Link className={css.redirectLink} to='/register'>
              Regístrate
            </Link>
          </div>
        </div>
        <div className={css.loginBackgroundWrapper}>
          <img src={teodrive} className={css.loginLogo} />
          <img src={loginBackground} className={css.loginBackground} />
        </div>
      </section>
    </main>
  );
}
export default Login;
