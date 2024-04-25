import css from './DashboardSectionHeader.module.css';

export const DashboardSectionHeader = ({ title, description, counter, children }) => {
  return (
    <div className={css.DashboardSectionHeader}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={css.sectionHeaderTitle}>{title} {counter && <span style={{ color: '#424242' }}>{counter.toLocaleString("en-US")}</span>}</h1>
        <h1 className={css.sectionHeaderDescription}>{description}</h1>
      </div>
      <div className={css.sectionHeaderActions}>
        {children}
      </div>
    </div>
  );
};
