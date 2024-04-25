import PropTypes from 'prop-types';
import css from './EmptyState.module.css';

/**
 * Prop types for EmptyState
 *
 * @param {React.ReactNode} props.icon Icon of the state
 * @param {string} props.title Title of the state
 * @param {string} props.caption Caption of the state
 * @param {React.ReactNode} props.action Action of the state
 */

const EmptyState = ({ icon, title, caption, action }) => {
  return (
    <div className={css.EmptyStateWrapper}>
      <div className={css.emptyStateIcon}>{icon}</div>
      <div className={css.titleAndCaption}>
        <h1 className={css.title}>{title}</h1>
        <h2 className={css.caption}>{caption}</h2>
      </div>
      {action}
    </div>
  );
};
export default EmptyState;

EmptyState.defaultProps = {
  title: 'Title',
  caption: 'Caption',
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  caption: PropTypes.string,
  action: PropTypes.node,
};
