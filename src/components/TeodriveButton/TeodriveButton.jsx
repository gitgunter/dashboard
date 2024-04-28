import css from './TeodriveButton.module.css';

const TeodriveButton = ({
  isLoading,
  icon,
  variant = 'default',
  size = 'medium',
  width,
  children,
  ...props
}) => {
  const buttonClassName = `${props.className} ${css.TeodriveButton} ${css[variant]} ${css[size]}`;

  return (
    <button
      {...props}
      style={{ width: width || 'fit-content' }}
      type={props.type || 'button'}
      className={buttonClassName}
    >
      {icon}
      {!isLoading && children}
    </button>
  );
};

export default TeodriveButton;
