import { Link, useMatch } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

import css from './DashboardSidebar.module.css';

import teodrive from '@assets/images/teodrive.svg';
import logo from '@assets/images/teodrive_logo.svg';
import { SidebarProfile } from '../SidebarProfile/SidebarProfile';
import { useSidebar } from '@context/SidebarContext';

export const DashboardSidebar = () => {
  const { data } = useAuth();

  return (
    <aside className={css.DashboardSidebar}>
      <div className={css.sidebarHeader}>
        <img src={logo} style={{ height: '1.375rem' }} alt='Teodrive logo' />
        <img
          src={teodrive}
          style={{ height: '1.25rem', paddingLeft: '0.625rem' }}
          alt='Teodrive logo'
        />
      </div>
      <SidebarNav title='General'>
        <SidebarLink
          path='/'
          icon={<DashboardSquare02 className={css.linkIcon} />}
          label='Resumen'
        />
        <SidebarLink
          path='/temario'
          icon={<Book02 className={css.linkIcon} />}
          label='Temario'
        />
        <SidebarLink
          path='/examenes'
          icon={<Note className={css.linkIcon} />}
          label='Exámenes'
        />
        <SidebarLink
          path='/notas'
          icon={<StickyNote01 className={css.linkIcon} />}
          label='Notas'
        />
      </SidebarNav>
      <SidebarNav title='Modalidades'>
        <SidebarLink
          path='/modalidades/quick-test'
          icon={<Hourglass className={css.linkIcon} />}
          label='Quick test'
        />
        <SidebarLink
          path='/modalidades/un-minuto'
          icon={<Timer02 className={css.linkIcon} />}
          label='Un minuto'
        />
        <SidebarLink
          path='/modalidades/verdad-falso'
          icon={<ThumbsUpDown className={css.linkIcon} />}
          label='Verdad o falso'
        />
      </SidebarNav>
      <div className={css.sidebarBottom}>
        <div className={css.navBottom}>
          {data?.plan === 'basic' ||
            (data?.plan === 'free' && (
              <SidebarLink
                path={'https://www.teodrive.com/'}
                icon={<Crown size={20} className={css.linkIcon} />}
                label='Obten Premium'
                className={css.premium}
              />
            ))}
          <SidebarLink
            path={'https://www.teodrive.com/'}
            icon={<Flash size={20} className={css.linkIcon} />}
            label='Novedades'
          />
          <SidebarLink
            path='https://soporte.teodrive.com/'
            icon={<CustomerSupport className={css.linkIcon} />}
            label='Necesito ayuda'
          />
        </div>
        <SidebarProfile data={data} />
      </div>
    </aside>
  );
};

export const SidebarLink = ({ icon, label, path, className }) => {
  const match = useMatch(path);

  const { setIsSidebar } = useSidebar();

  return (
    <Link
      to={path}
      className={`${css.SidebarLink} ${match ? css.onPage : ''} ${className}`}
      onClick={() => setIsSidebar(false)}
    >
      {icon && icon}
      <span>{label}</span>
    </Link>
  );
};

export const SidebarNav = ({ title, children }) => {
  return (
    <div className={css.SidebarNav}>
      <span className={css.navTitle}>{title}</span>
      <div className={css.navWrapper}>{children}</div>
    </div>
  );
};

export const DashboardSquare02 = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 6c0-1.886 0-2.828.586-3.414C3.172 2 4.114 2 6 2c1.886 0 2.828 0 3.414.586C10 3.172 10 4.114 10 6v2c0 1.886 0 2.828-.586 3.414C8.828 12 7.886 12 6 12c-1.886 0-2.828 0-3.414-.586C2 10.828 2 9.886 2 8V6zM2 19c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C3.602 16 4.068 16 5 16h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C10 17.602 10 18.068 10 19c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C8.398 22 7.932 22 7 22H5c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C2 20.398 2 19.932 2 19zM14 16c0-1.886 0-2.828.586-3.414C15.172 12 16.114 12 18 12c1.886 0 2.828 0 3.414.586C22 13.172 22 14.114 22 16v2c0 1.886 0 2.828-.586 3.414C20.828 22 19.886 22 18 22c-1.886 0-2.828 0-3.414-.586C14 20.828 14 19.886 14 18v-2zM14 5c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C15.602 2 16.068 2 17 2h2c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C22 3.602 22 4.068 22 5c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C20.398 8 19.932 8 19 8h-2c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C14 6.398 14 5.932 14 5z'
        stroke='inherit'
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Book02 = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.5 16.929V10c0-3.771 0-5.657-1.172-6.828C18.157 2 16.271 2 12.5 2h-1C7.729 2 5.843 2 4.672 3.172 3.5 4.343 3.5 6.229 3.5 10v9.5'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M20.5 17H6a2.5 2.5 0 000 5h14.5M20.5 22a2.5 2.5 0 010-5'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M15 7H9M12 11H9'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Note = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.88 7.017l4.774 1.271m-5.796 2.525l2.386.636m-2.268 6.517l.955.255c2.7.72 4.05 1.079 5.114.468 1.063-.61 1.425-1.953 2.148-4.637l1.023-3.797c.724-2.685 1.085-4.027.471-5.085-.614-1.057-1.963-1.417-4.664-2.136l-.954-.255c-2.7-.72-4.05-1.079-5.113-.468-1.064.61-1.426 1.953-2.15 4.637l-1.022 3.797c-.724 2.685-1.086 4.027-.471 5.085.614 1.057 1.964 1.417 4.663 2.136z'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M12 20.946l-.952.26c-2.694.733-4.04 1.1-5.102.477-1.06-.622-1.422-1.99-2.143-4.728l-1.021-3.872c-.722-2.737-1.083-4.106-.47-5.184C2.842 6.966 4 7 5.5 7'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};

export const StickyNote01 = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.596 20.699l-2.445.647c-2.263.6-3.395.899-4.281.408-.887-.49-1.182-1.58-1.773-3.758l-1.462-5.391c-.59-2.179-.886-3.268-.367-4.13.52-.863 1.651-1.163 3.914-1.762l4-1.06c2.264-.598 3.395-.898 4.282-.407.886.49 1.182 1.58 1.772 3.758l1.468 5.413c.251.926.377 1.39.239 1.825m-5.347 4.457c.752-.2.758-.202 1.343-.704l2.743-2.355c.749-.642 1.123-.963 1.261-1.398m-5.347 4.457s.588-4.593 1.904-5.199c1.493-.687 3.443.742 3.443.742'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinejoin='round'
      />
      <path
        d='M17 5.001c-.064-1.073-.243-1.749-.752-2.233-.78-.742-2.03-.746-4.532-.754l-4.423-.013c-2.502-.007-3.753-.01-4.528.727-.775.737-.771 1.928-.764 4.31l.018 5.893c.008 2.381.011 3.572.79 4.314.78.742 2.031.746 4.533.753l.681.002'
        stroke={props.stroke}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const ThumbsUpDown = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.652 4.786l-.177.557c-.146.456-.218.684-.162.864a.639.639 0 00.28.354c.167.102.42.102.926.102h.27c1.713 0 2.57 0 2.974.492.047.057.088.116.123.18.312.548-.042 1.288-.75 2.767-.65 1.357-.974 2.036-1.577 2.435a2.752 2.752 0 01-.18.11C8.744 13 7.957 13 6.384 13h-.34c-1.907 0-2.86 0-3.452-.557C2 11.886 2 10.99 2 9.198v-.63c0-.942 0-1.413.172-1.844.172-.431.502-.786 1.162-1.494L6.06 2.298c.069-.074.103-.11.133-.136a.704.704 0 01.962.06c.027.028.055.07.113.15.09.128.135.191.175.254.351.564.458 1.234.297 1.87-.018.07-.042.144-.088.29zM16.348 19.214l.177-.557c.146-.456.218-.684.162-.864a.638.638 0 00-.28-.354c-.167-.102-.42-.102-.926-.102h-.27c-1.713 0-2.57 0-2.974-.492a1.264 1.264 0 01-.123-.18c-.312-.548.042-1.288.75-2.767.65-1.357.974-2.036 1.577-2.435.059-.04.119-.076.18-.11C15.256 11 16.043 11 17.616 11h.34c1.907 0 2.86 0 3.452.557.592.557.592 1.453.592 3.245v.63c0 .942 0 1.413-.172 1.844-.172.431-.502.786-1.162 1.494l-2.727 2.932c-.069.073-.103.11-.133.136a.704.704 0 01-.962-.06 1.786 1.786 0 01-.113-.15c-.09-.128-.135-.191-.175-.254a2.405 2.405 0 01-.297-1.87c.018-.07.042-.144.088-.29z'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Hourglass = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19 2v3a7 7 0 01-7 7M5 2v3a7 7 0 007 7m0 0a7 7 0 017 7v3m-7-10a7 7 0 00-7 7v3'
        stroke={props.stroke}
        strokeWidth={1.5}
      />
      <path
        d='M4 2h16m0 20H4'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};

export const Timer02 = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 22h11a9 9 0 100-18c-4.633 0-8.503 3.5-9 8'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M18.5 5.5l1-1m-14 0l1 1'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.5 9l-2.94 2.94m0 0a1.5 1.5 0 10-2.121 2.121 1.5 1.5 0 002.122-2.122z'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
      <path
        d='M12.5 3.5V2M10.5 2h4M2 15h3M2 19h5'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const CustomerSupport = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17 10.805c0-.346 0-.519.052-.673.151-.448.55-.621.95-.803.448-.205.672-.307.895-.325.252-.02.505.034.721.155.286.16.486.466.69.714.943 1.146 1.415 1.719 1.587 2.35.14.51.14 1.044 0 1.553-.251.922-1.046 1.694-1.635 2.41-.301.365-.452.548-.642.655a1.27 1.27 0 01-.721.155c-.223-.018-.447-.12-.896-.325-.4-.182-.798-.355-.949-.803-.052-.154-.052-.327-.052-.673v-4.39zM7 10.805c0-.436-.012-.827-.364-1.133-.128-.111-.298-.188-.637-.343-.449-.204-.673-.307-.896-.325-.667-.054-1.026.402-1.41.87-.944 1.145-1.416 1.718-1.589 2.35-.139.51-.139 1.043 0 1.553.252.921 1.048 1.694 1.636 2.409.371.45.726.861 1.363.81.223-.018.447-.12.896-.325.34-.154.509-.232.637-.343.352-.306.364-.697.364-1.132v-4.391z'
        stroke={props.stroke}
        strokeWidth={1.5}
      />
      <path
        d='M5 9c0-3.314 3.134-6 7-6s7 2.686 7 6'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='square'
        strokeLinejoin='round'
      />
      <path
        d='M19 17v.8c0 1.767-1.79 3.2-4 3.2h-2'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Flash = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.226 11.33l6.998-8.983c.547-.703 1.573-.266 1.573.67V9.97c0 .56.402 1.015.899 1.015H18.1c.773 0 1.185 1.03.674 1.686l-6.998 8.983c-.547.702-1.573.265-1.573-.671V14.03c0-.56-.403-1.015-.899-1.015H5.9c-.773 0-1.185-1.03-.674-1.686z'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Crown = (props) => {
  return (
    <svg
      {...props}
      width={20}
      height={20}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.518 10.306c-.388-1.074-.582-1.611-.5-1.955.091-.377.359-.67.701-.768.313-.09.8.127 1.773.56.86.382 1.29.573 1.695.563.446-.012.874-.19 1.215-.507.31-.287.517-.744.932-1.658l.915-2.016C11.013 2.842 11.395 2 12 2s.987.842 1.751 2.525l.915 2.016c.415.914.623 1.371.932 1.658.341.316.77.495 1.215.507.404.01.835-.181 1.695-.564.974-.432 1.46-.649 1.773-.559.342.098.61.391.7.768.083.344-.111.88-.5 1.955l-1.667 4.616c-.714 1.975-1.07 2.962-1.817 3.52-.747.558-1.712.558-3.641.558h-2.712c-1.93 0-2.894 0-3.64-.558-.747-.558-1.104-1.545-1.818-3.52l-1.668-4.616z'
        stroke={props.stroke}
        strokeWidth={1.5}
      />
      <path
        d='M12 14h.009'
        stroke={props.stroke}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7 22h10'
        stroke={props.stroke}
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </svg>
  );
};
