import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <div>
      <Helmet>
        <title>Registro</title>
        <meta
          name='description'
          content='Crea una cuenta totalmente gratis y prueba las funcionalidades que ofrece Teodrive'
        />
        <link rel='canonical' href='https://app.teodrive.com/register' />
      </Helmet>
      Register
      <br />
      <Link to='/login'>Login</Link>
    </div>
  );
}
export default Register;
