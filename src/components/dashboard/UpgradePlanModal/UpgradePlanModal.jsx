import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ModalWrap from '@components/common/ModalWrap/ModalWrap';
import Wrap from '@components/common/Wrap/Wrap';
import { Tick02 } from '@icons/index';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';
import planData from '@config/plans.json';

import css from './UpgradePlanModal.module.css';
import { useAuth } from '@context/AuthContext';

const UpgradePlanModal = ({ isVisible, onCancel }) => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const { data } = useAuth();

  useEffect(() => {
    const plan = planData.find((plan) => plan.plan_id === selectedPlan);
    if (plan) {
      setSelectedFeatures(plan.features);
    }
  }, [selectedPlan]);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedPlan(value);
  };

  useEffect(() => {
    if (!isVisible && selectedPlan !== 'premium') {
      setSelectedPlan('premium');
    }
  }, [isVisible, selectedPlan]);

  // Logica de negocio
  const id = nanoid();
  const apiURL = 'https://api.teodrive.com/payments/purchase-plan';

  const createPayment = async () => {
    try {
      const plan = planData.find((plan) => plan.plan_id === selectedPlan);
      const payment = await axios.post(apiURL, {
        user_order_id: id,
        user_order_email: data?.email,
        variant_id: plan.variant_id,
      });

      window.location.href = payment.data;
    } catch (error) {
      console.error('Error fetching:', error);
      throw error;
    }
  };

  return (
    <ModalWrap isVisible={isVisible} onClose={onCancel}>
      <div className={css.UpgradePlanModal}>
        <Wrap direction='column' rowGap='1.5rem'>
          <Wrap direction='column'>
            <h1 className={css.title}>Funciones</h1>
            <h2 className={css.caption}>Desbloquea funciones adicionales</h2>
          </Wrap>
          <Wrap direction='column' rowGap='0.625rem'>
            {selectedFeatures.map((feature, index) => (
              <Feature key={index} label={feature} />
            ))}
          </Wrap>
        </Wrap>
        <hr className={css.Divider} />
        <Wrap direction='column' rowGap='1rem' width='260px'>
          <h1 className={css.title}>Planes</h1>
          <Wrap direction='column' rowGap='0.5rem' width='100%'>
            {planData.map((plan) => (
              <Plan
                key={plan.plan_id}
                title={plan.plan_name}
                price={plan.price}
                value={plan.plan_id}
                onChange={handleRadioChange}
                selected={selectedPlan}
              />
            ))}
          </Wrap>
          <Wrap direction='column' rowGap='0.625rem' className={css.bottom}>
            <TeodriveButton
              onClick={createPayment}
              className={css.upgradePlanButton}
              width='100%'
            >
              {`Obtener ${selectedPlan === 'premium' ? 'Premium' : 'Básico'}`}
            </TeodriveButton>
            <p className={css.terms}>
              Al continuar, usted acepta los{' '}
              <Link className={css.underline}>
                Términos y Condiciones de Teodrive
              </Link>
            </p>
          </Wrap>
        </Wrap>
      </div>
    </ModalWrap>
  );
};
export default UpgradePlanModal;

export const Feature = ({ label }) => {
  return (
    <Wrap display='inline-flex' columnGap='0.75rem' align='center'>
      <Tick02 size={20} color='#207FD6' />
      <p className={css.featureLabel}>{label}</p>
    </Wrap>
  );
};

export const Plan = ({ title, price, selected, ...props }) => {
  return (
    <label
      className={`${css.Plan} ${selected === props.value ? css.active : ''}`}
    >
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
      <Wrap direction='column'>
        <h2 className={css.title}>{title}</h2>
        <h1 className={css.price}>
          {`₡${price}`}
          <span className={css.billed}>/ mes</span>
        </h1>
      </Wrap>
      <span className={css.radio}></span>
    </label>
  );
};
