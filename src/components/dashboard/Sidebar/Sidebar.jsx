import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';

import Wrap from '@components/common/Wrap/Wrap';
import sidebarData from '@config/sidebarData';
import { Crown, CustomerSupport, News } from '@icons/index';
import AccountButton from '../AccountButton/AccountButton';
import UpgradePlanModal from '@components/dashboard/UpgradePlanModal/UpgradePlanModal';
import AccountSettingsModal from '@components/dashboard/AccountSettingsModal/AccountSettingsModal';
import { usePlan } from '@context/PlanContext';
import NotificationButton from '../NotificationButton/NotificationButton';

import teodrive from '@assets/images/teodrive.svg';
import logo from '@assets/images/teodrive_logo.svg';

import css from './Sidebar.module.css';
import Badge from '@components/common/Badge/Badge';

const Sidebar = () => {
  const [upgradePlanModal, setUpgradePlanModal] = useState(false);
  const [accountSettingsModal, setAccountSettingsModal] = useState(false);

  const { isPlan } = usePlan();

  const onUpgradePlanModal = (e) => {
    if (isPlan !== 'premium') {
      e.preventDefault();
      setUpgradePlanModal(true);
    }
  };

  // Filtrar elementos de la sección 'General'
  const generalItems = sidebarData.find(
    (section) => section.section === 'General'
  ).items;

  // Filtrar elementos de la sección 'Modalidades'
  const modalidadesItems = sidebarData.find(
    (section) => section.section === 'Modalidades'
  ).items;

  return (
    <aside className={css.Sidebar}>
      <UpgradePlanModal
        isVisible={upgradePlanModal}
        onCancel={() => setUpgradePlanModal(false)}
      />
      <AccountSettingsModal
        isVisible={accountSettingsModal}
        onClose={() => setAccountSettingsModal(false)}
      />
      <div className={css.logoWrapper}>
        <img src={logo} style={{ height: '1.375rem' }} alt='Teodrive logo' />
        <img
          src={teodrive}
          style={{ height: '1.25rem', paddingLeft: '0.625rem' }}
          alt='Teodrive logo'
        />
      </div>
      {/* Map para la sección 'General' */}
      <Wrap direction='column' rowGap='0.25rem'>
        <span className={css.sectionTitle}>General</span>
        {generalItems.map((cell) => (
          <Cell
            key={cell.label}
            icon={cell.icon}
            label={cell.label}
            path={cell.link}
          />
        ))}
      </Wrap>

      {/* Map para la sección 'Modalidades' */}
      <Wrap direction='column' rowGap='0.25rem'>
        <span className={css.sectionTitle}>Modalidades</span>
        {modalidadesItems.map((cell) => (
          <Cell
            key={cell.label}
            icon={cell.icon}
            label={cell.label}
            path={cell.link}
            onClick={onUpgradePlanModal}
            badge={
              (isPlan === 'free' || isPlan === 'basic') && (
                <Badge
                  label='Premium'
                  color='rgb(255, 188, 15)'
                  borderColor='rgba(255, 188, 15, 0)'
                  bgColor='rgba(255, 188, 15, 0.1)'
                />
              )
            }
          />
        ))}
      </Wrap>
      <Wrap
        direction='column'
        justify='flex-end'
        rowGap='0.25rem'
        height='100%'
      >
        {(isPlan === 'free' || isPlan === 'basic') && (
          <Cell
            icon={<Crown size={20} className={css.icon} />}
            label='Obten Premium'
            className={css.premium}
            path='#'
            onClick={onUpgradePlanModal}
          />
        )}

        <Cell
          icon={<News size={20} className={css.icon} />}
          label='Novedades'
          path='/novedades'
        />
        <Cell
          icon={<CustomerSupport size={20} className={css.icon} />}
          label='Necesito ayuda'
          path='#'
        />
      </Wrap>
      <Wrap align='center' columnGap='0.625rem'>
        <AccountButton onClick={() => setAccountSettingsModal(true)} />
        <NotificationButton />
      </Wrap>
    </aside>
  );
};
export default Sidebar;

export const Cell = ({
  icon,
  label,
  badge,
  badgeColor,
  path,
  className,
  onClick,
}) => {
  const match = useMatch(path || '#');

  return (
    <Link
      to={path}
      className={`${css.Cell} ${className || ''} ${match ? css.active : ''}`}
      onClick={onClick}
      draggable={false}
    >
      {icon && icon}
      <h3 className={css.label}>
        {label} {badge && badge}
        {/* <span className={`${css.badge} ${css[badgeColor]}`}>{badge}</span> */}
      </h3>
    </Link>
  );
};
