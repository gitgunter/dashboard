import css from './LabelSwitch.module.css';

export const LabelSwitch = ({ name, value, onChange, label, caption }) => {
  return (
    <label className={`${css.LabelSwitch} ${value ? css.active : ''}`}>
      <div className={css.labelWrapper}>
        <h1 className={css.label}>{label}</h1>
        <h2 className={css.caption}>{caption}</h2>
      </div>
      <input
        type='checkbox'
        name={name}
        checked={value}
        onChange={onChange}
        style={{
          display: 'none',
          visibility: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
          width: 0,
          height: 0,
        }}
      />
      <div className={css.switch}>
        <span className={css.slider}></span>
      </div>
    </label>
  );
};
