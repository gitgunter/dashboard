import PropTypes from 'prop-types';
import css from './TeodriveButton.module.css';

/**
 * @typedef {'default' | 'primary' | 'secondary' | 'ghost' | 'outline'} Variant
 * Define los estilos de variantes disponibles para el botón.
 */

/**
 * @typedef {'small' | 'medium' | 'large'} Size
 * Define los tamaños disponibles para el botón.
 */

/**
 * Componente Button que renderiza un botón personalizable con diferentes variantes y tamaños.
 *
 * @param {React.ButtonHTMLAttributes} props Las props del componente.
 * @param {React.ReactNode} props.icon Icono a mostrar en el botón.
 * @param {Variant} props.variant La variante de estilos del botón.
 * @param {Size} props.size El tamaño del botón. Por defecto es 'medium'.
 * @param {React.ReactNode} props.children Los componentes hijos a renderizar dentro del botón.
 * @returns {React.ReactNode} El componente de botón renderizado.
 */

const TeodriveButton = ({ icon, variant, size, width, children, ...props }) => {
  const buttonClassName = `${props.className} ${css.TeodriveButton} ${css[variant]} ${css[size]}`;

  return (
    <button {...props} style={{ width: width || 'fit-content' }} type='button' className={buttonClassName}>
      {icon}
      {children}
    </button>
  );
};
export default TeodriveButton;

TeodriveButton.defaultProps = {
  variant: 'default',
  size: 'medium',
};

TeodriveButton.propTypes = {
  icon: PropTypes.node,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'ghost',
    'outline',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node,
};
