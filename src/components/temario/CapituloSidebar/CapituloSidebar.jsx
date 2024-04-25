import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ArrowDown01, Folder01 } from '@icons/index';

import css from './CapituloSidebar.module.css';

const CapituloSidebar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [dropListHeight, setDropListHeight] = useState(0);
  const [selectedCellPosition, setSelectedCellPosition] = useState({
    top: 0,
    height: 0,
  });

  const dropListData = [
    { label: 'Circulación Peatonal', path: '/circulacion-peatonal' },
    { label: 'Zona Urbana', path: '/zona-urbana' },
    { label: 'Zona Rural', path: '/zona-rural' },
    { label: 'Intersecciones', path: '/zona-rural' },
    { label: 'Prioridades de Paso', path: '/zona-rural' },
    { label: 'Adelantamiento', path: '/zona-rural' },
    { label: 'Accidentes', path: '/zona-rural' },
    { label: 'Giros', path: '/zona-rural' },
    { label: 'Distancias de Parada', path: '/zona-rural' },
    { label: 'Estacionamiento', path: '/zona-rural' },
  ];

  const dropRef = useRef(null);
  const cellRefs = useRef([]); // Array de referencias

  useEffect(() => {
    if (isDropdown) {
      const dropCurrent = dropRef.current;
      const newHeight = dropCurrent.scrollHeight;
      setDropListHeight(newHeight);
    } else {
      setDropListHeight(0);
    }
  }, [isDropdown]);

  const handleSlider = (e, cellRef) => {
    e.preventDefault();
    const cellProperties = cellRef.getBoundingClientRect();
    setSelectedCellPosition({
      top: cellProperties.top,
      height: cellProperties.height,
    });
  };

  const toggleDropdown = () => {
    if (selectedCellPosition.top > 0 && selectedCellPosition.height > 0) {
      setSelectedCellPosition({
        top: 0,
        height: 0,
      });
    } else {
      setIsDropdown(!isDropdown);
    }
  };

  return (
    <aside className={css.CapituloSidebar}>
      <div className={css.dropdown}>
        <Cell
          icon={
            <ArrowDown01
              size={20}
              className={`${css.icon} ${isDropdown ? css.active : ''}`}
            />
          }
          label='Normas de Circulación'
          className={isDropdown ? css.active : ''}
          onClick={toggleDropdown}
        />
        <motion.div
          animate={{ height: dropListHeight }}
          transition={{
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
          }}
          ref={dropRef}
          className={css.dropList}
          style={{ height: `${isDropdown ? 'auto' : '0'}` }}
        >
          <span
            className={css.slider}
            style={{
              height: selectedCellPosition.height - 8,
              top: selectedCellPosition.top - 44,
            }}
          ></span>
          {dropListData.map((item, index) => (
            <CellDropdown
              key={index}
              // icon={<Folder01 size={20} className={css.folder} />}
              label={item.label}
              cellRef={(ref) => (cellRefs.current[index] = ref)}
              onClick={(e) => handleSlider(e, cellRefs.current[index])}
            />
          ))}
        </motion.div>
      </div>
    </aside>
  );
};
export default CapituloSidebar;

export const CellDropdown = ({
  icon,
  label,
  badge,
  badgeColor,
  path,
  className,
  onClick,
  cellRef,
}) => {
  return (
    <Link
      ref={cellRef}
      to={path}
      className={`${css.CellDropdown} ${className || ''}`}
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

export const Cell = ({
  icon,
  label,
  badge,
  badgeColor,
  path,
  className,
  onClick,
  cellRef,
}) => {
  return (
    <Link
      ref={cellRef}
      to={path}
      className={`${css.Cell} ${className || ''}`}
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
