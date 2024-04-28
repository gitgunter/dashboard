import css from './TeodriveInput.module.css';

/**
 * Teodrive Input Component
 * @param {React.InputHTMLAttributes} props React input attributes
 * @param {String} props.inputSize Size of the input component
 * @param {String} props.inputLabel Texto del label para el input
 */
const TeodriveInput = ({
  inputLabel,
  inputSize,
  error,
  helperText,
  helperTextColor,
  ...props
}) => {
  return (
    <label htmlFor={props.id} className={css.inputLabel}>
      {inputLabel && <span className={css.inputLabelText}>{inputLabel}</span>}
      <div className={css.inputWrapper}>
        <input
          {...props}
          name={props.name || 'input'}
          spellCheck={props.spellCheck || false}
          autoComplete={props.autoComplete || 'off'}
          placeholder={props.placeholder || ''}
          className={`${inputSize === 'medium' ? css.medium : ''} ${
            error && css.error
          }`}
        />
      </div>
      {error && <span className={css.inputError}>{error}</span>}
      {helperText && (
        <span className={css.helperText} style={{ color: helperTextColor }}>
          {helperText}
        </span>
      )}
    </label>
  );
};
export default TeodriveInput;
