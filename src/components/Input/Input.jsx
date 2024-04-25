import css from './Input.module.css'

export const Input = ({
  id,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Placeholder',
  showPassword = false,
  className,
  label,
  error
}) => {
  return (
    <label htmlFor={id} className={`${css.Input} ${className}`}>
      {label && <span className={css.inputLabel}>{label}</span>}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? css.error : ''}
          autoComplete='off'
          spellCheck='false'
          onBlur={onBlur}
          formNoValidate
        />
        {showPassword && <div className={css.eyeIcon}>eye</div>}
      </div>
    </label>
  );
};
