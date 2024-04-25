import css from './LoadingState.module.css';

const LoadingState = () => {
  return (
    <div className={css.loadingState}>
      <span className={css.loadingStateSpinner}></span>
    </div>
  );
};
export default LoadingState;
