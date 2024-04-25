import { useState } from 'react';
import { Emoji } from 'emoji-picker-react';

import ModalWrap from '@components/common/ModalWrap/ModalWrap';
import Wrap from '@components/common/Wrap/Wrap';
import TeodriveInput from '@components/TeodriveInput/TeodriveInput';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';
import { useAuth } from '@context/AuthContext';

import { colors } from '@config/profileColors.json';

import css from './AccountSettingsModal.module.css';

const AccountSettingsModal = ({ isVisible, onClose }) => {
  const [colorPicked, setColorPicked] = useState('white');

  const { isLoading, data } = useAuth();
  return (
    <ModalWrap
      isVisible={isVisible}
      onClose={onClose}
      key='AccountSettingsModal'
    >
      <div className={css.AccountSettingsModal}>
        <Section title='Mi Perfil'>
          <Wrap columnGap='1rem' width='100%'>
            <div className={`${css.profileAvatar} ${css[colorPicked]}`}>
              <Emoji size={44} unified={!isLoading && data?.profile_emoji} />
            </div>
            <Wrap width='250px'>
              <TeodriveInput
                type='text'
                inputLabel='Nombre de usuario'
                value={!isLoading && data?.username}
              />
            </Wrap>
          </Wrap>
          <div className={css.colorPicker}>
            <span className={css.label}>Color de fondo</span>
            <Wrap columnGap='0.625rem'>
              {colors.map((color, index) => (
                <button
                  key={index}
                  type='button'
                  className={`${css.colorBtn} ${
                    colorPicked === color ? css.active : ''
                  } ${css[color]}`}
                  onClick={() => setColorPicked(color)}
                ></button>
              ))}
            </Wrap>
          </div>
        </Section>
        <Section title='Seguridad de cuenta'>
          <TeodriveInput
            type='text'
            inputLabel='Correo electrónico'
            placeholder='Nuevo correo electrónico'
            helperText='Este correo electrónico se empleará para enviar notificaciones sobre alertas de seguridad, estados de pago, y otros asuntos relevantes.'
          />
          <Setting label='Contraseña'>
            <TeodriveButton size='small' variant='primary'>
              Cambiar contraseña
            </TeodriveButton>
            <p className={css.helperText}>
              Establezca una contraseña permanente para acceder a su cuenta.
            </p>
          </Setting>
          {/* <TeodriveInput
            type='password'
            inputLabel='Contraseña'
            placeholder='Nueva contraseña'
            helperText='Utiliza una contraseña que incluya mínimo 8 caracteres, asegurándose de que contenga al menos una letra y un número.'
          /> */}
        </Section>
        <Section title='Opciones de riesgo'>
          <Setting label='Eliminar cuenta'>
            <button type='button' className={css.deleteAccountBtn}>
              Eliminar cuenta
            </button>
            <p className={css.helperText}>
              Elimine permanentemente su cuenta y todo su contenido.
            </p>
          </Setting>
        </Section>
        <Wrap justify='space-between' width='100%'>
          <TeodriveButton size='small' variant='ghost' onClick={onClose}>
            Cancelar
          </TeodriveButton>
          <TeodriveButton size='small'>Guardar</TeodriveButton>
        </Wrap>
      </div>
    </ModalWrap>
  );
};
export default AccountSettingsModal;

export const SectionHeader = ({ title, caption }) => {
  return (
    <div className={css.sectionHeader}>
      <h1 className={css.sectionTitle}>{title || 'Section Title'}</h1>
      {caption && <h2 className={css.caption}>{caption}</h2>}
    </div>
  );
};

export const Section = ({ title, caption, children }) => {
  return (
    <Wrap direction='column' width='100%'>
      <SectionHeader title={title} caption={caption} />
      <Wrap direction='column' rowGap='1.125rem' width='100%'>
        {children}
      </Wrap>
    </Wrap>
  );
};

export const Setting = ({ label, children }) => {
  return (
    <div className={css.Setting}>
      <span className={css.label}>{label}</span>
      {children}
    </div>
  );
};
