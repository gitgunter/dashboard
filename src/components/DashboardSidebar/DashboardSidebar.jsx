import { Link, useMatch } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

import css from './DashboardSidebar.module.css';

import teodrive from '@assets/images/teodrive.svg';
import logo from '@assets/images/teodrive_logo.svg';
import { SidebarProfile } from '../SidebarProfile/SidebarProfile';
import { useSidebar } from '@context/SidebarContext';
import sidebarData from '@config/sidebarData';

export const DashboardSidebar = () => {
  const { isLoading, data } = useAuth();

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
      {sidebarData.map((sb, index) => (
        <SidebarNav key={index} title={sb.section}>
          {sb.items.map((item) => (
            <SidebarLink
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.link}
            />
          ))}
        </SidebarNav>
      ))}
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
        <SidebarProfile />
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
