import { createPortal } from 'react-dom';
import Spinner from '../Spinner/Spinner';

import css from './ScreenLoader.module.css';

const ScreenLoader = () => {
  return createPortal(
    <div className={css.ScreenLoader}>
      <TeodriveLogo />
      <Spinner />
    </div>,
    document.getElementById('overlays')
  );
};
export default ScreenLoader;

export const TeodriveLogo = (props) => {
  return (
    <svg
      {...props}
      width={36}
      height={34}
      viewBox='0 0 50 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M.143 1.214C.143.544.686 0 1.356 0h14.145c.67 0 1.213.543 1.213 1.214v14.144c0 .67-.543 1.213-1.213 1.213H1.356c-.67 0-1.213-.543-1.213-1.213V1.214z'
        fill='#fff'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M33.787 0c-.322 0-.63.128-.858.355l-15.86 15.86a1.214 1.214 0 00-.356.86V46.783c0 1.081 1.307 1.623 2.072.858l14.144-14.144c.228-.227.356-.536.356-.858V17.785c0-.67.543-1.214 1.213-1.214h14.145c.67 0 1.213-.543 1.213-1.213V1.214c0-.67-.543-1.214-1.213-1.214H33.787z'
        fill='#fff'
      />
    </svg>
  );
};
