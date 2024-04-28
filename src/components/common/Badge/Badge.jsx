import css from './Badge.module.css';

const Badge = ({ label, color, bgColor, borderColor }) => {
  return (
    <span
      style={{
        boxShadow: borderColor && `inset 0 0 0 1px ${borderColor}`,
        backgroundColor: bgColor,
        color: color,
      }}
      className={css.Badge}
    >
      {label}
    </span>
  );
};
export default Badge;
