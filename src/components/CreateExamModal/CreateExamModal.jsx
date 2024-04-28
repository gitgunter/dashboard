import { useState } from 'react';
import { createPortal } from 'react-dom';
import { m } from 'framer-motion';
import { useClickAway } from '@uidotdev/usehooks';

import { LabelSwitch } from '../LabelSwitch/LabelSwitch';
import TeodriveButton from '../TeodriveButton/TeodriveButton';
import TeodriveInput from '@components/TeodriveInput/TeodriveInput';

import css from './CreateExamModal.module.css';
import { File02Solid, MagicWand01Solid } from '@icons/index';

export const CreateExamModal = ({ onCancel, onCreate, formik }) => {
  const [selectedOption, setSelectedOption] = useState('normal');

  const modalRef = useClickAway(() => onCancel());

  const handleRadioChange = (event) => {
    const value = event.target.value;
    formik.resetForm();
    setSelectedOption(value);
  };

  return createPortal(
    <m.div
      className={css.CreateExamModal}
      tabIndex={0}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: 'easeInOut',
      }}
    >
      <m.div
        ref={modalRef}
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <div className={css.modalHeader}>
          <h1 className={css.modalHeaderTitle}>Crear un nuevo examen</h1>
          <h2 className={css.modalHeaderCaption}>
            Elige el tipo de examen que deseas realizar
          </h2>
        </div>
        <div className={css.modalContent}>
          <div className={css.examSelectWrapper}>
            <LabelRadio
              icon={<File02Solid className={css.icon} />}
              label='Normal'
              caption='Examen de 40 preguntas y 50 minutos para realizar la prueba'
              value='normal'
              onChange={handleRadioChange}
              selected={selectedOption}
            />
            <LabelRadio
              icon={<MagicWand01Solid className={css.icon} />}
              label='Personalizado'
              caption='Personaliza tu examen según tus preferencias de estudio'
              value='custom'
              onChange={handleRadioChange}
              selected={selectedOption}
            />
          </div>
          <TeodriveInput
            inputLabel='Nombre del examen'
            type='text'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder={
              selectedOption === 'custom' ? 'Examen personalizado' : 'Mi examen'
            }
            error={
              formik.errors.name && formik.touched.name && formik.errors.name
            }
          />
          {selectedOption === 'custom' ? (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: 'inline-flex',
                columnGap: '1rem',
                paddingTop: '1rem',
              }}
              noValidate
            >
              <TeodriveInput
                inputLabel='Preguntas'
                type='number'
                name='questions'
                placeholder='10'
                value={formik.values.questions}
                onChange={formik.handleChange}
                error={
                  formik.errors.questions && formik.touched.questions && formik.errors.questions
                }
              />
              <TeodriveInput
                inputLabel='Duración'
                type='number'
                name='timeLimit'
                placeholder='10 min'
                value={formik.values.timeLimit}
                onChange={formik.handleChange}
                error={
                  formik.errors.timeLimit && formik.touched.timeLimit && formik.errors.timeLimit
                }
              />
            </form>
          ) : null}
          {selectedOption === 'custom' ? (
            <div
              className={css.advanceOptions}
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1.5rem',
                paddingTop: '1.5rem',
              }}
            >
              <LabelSwitch
                label='Resultado'
                caption='Al finalizar el examen, te mostrará los resultados del mismo'
                name='isShowResults'
                value={formik.values.isShowResults}
                onChange={formik.handleChange}
              />
              <LabelSwitch
                label='Repetir fallos'
                caption='Muestra nuevamente las preguntas incorrectas del examen previo'
                name='isRepeatFailures'
                value={formik.values.isRepeatFailures}
                onChange={formik.handleChange}
              />
              <LabelSwitch
                label='Controles'
                caption='Agrega botones para detener y continuar el tiempo del examen'
                name='isTimerControllers'
                value={formik.values.isTimerControllers}
                onChange={formik.handleChange}
              />
              <LabelSwitch
                label='Aciertos y fallos'
                caption='Muestra tus aciertos y fallos en tiempo real al marcar una respuesta'
                name='isRealTimeValidation'
                value={formik.values.isRealTimeValidation}
                onChange={formik.handleChange}
              />
            </div>
          ) : null}
        </div>
        <div className={css.modalButtonWrapper}>
          <TeodriveButton
            title='Cancelar'
            size='small'
            variant='ghost'
            onClick={onCancel}
          >
            Cancelar
          </TeodriveButton>
          <TeodriveButton title='Aceptar' size='small' onClick={onCreate}>
            Aceptar
          </TeodriveButton>
        </div>
      </m.div>
    </m.div>,
    document.getElementById('overlays')
  );
};

export const LabelRadio = ({ icon, label, caption, selected, ...props }) => {
  return (
    <label
      className={`${css.LabelRadio} ${
        selected === props.value ? css.active : ''
      }`}
    >
      {icon && icon}
      <div className={css.labelWrapper}>
        <h1 className={css.label}>{label}</h1>
        <h2 className={css.caption}>{caption}</h2>
      </div>
      <input
        {...props}
        type='radio'
        name='radio'
        checked={selected === props.value}
        style={{
          display: 'none',
          visibility: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
          width: 0,
          height: 0,
        }}
      />
      <span className={css.radio}></span>
    </label>
  );
};

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4.5 9.00012L7.68198 12.1821L14.0453 5.81812" stroke="white" strokeWidth="2.57143" strokeLinecap="round" strokeLinejoin="round"/>
      </svg> */
}
