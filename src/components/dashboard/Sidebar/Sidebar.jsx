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

const Sidebar = () => {
  const [upgradePlanModal, setUpgradePlanModal] = useState(false);
  const [accountSettingsModal, setAccountSettingsModal] = useState(false);
  const { isPlan } = usePlan();

  const onUpgradePlanModal = (e) => {
    e.preventDefault();
    setUpgradePlanModal(true);
  };

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
      {sidebarData.map((sb, index) => (
        <Wrap direction='column' rowGap='0.25rem' key={index}>
          <span className={css.sectionTitle}>{sb.section}</span>
          {sb.items.map((cell) => (
            <Cell
              key={cell.label}
              icon={cell.icon}
              label={cell.label}
              path={cell.link}
            />
          ))}
        </Wrap>
      ))}
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
    >
      {icon && icon}
      <h3 className={css.label}>
        {label}{' '}
        <span className={`${css.badge} ${css[badgeColor]}`}>{badge}</span>
      </h3>
    </Link>
  );
};
