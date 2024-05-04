import axios from 'axios';
import { nanoid } from 'nanoid';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Page } from '@components/Page/Page';
import { useToast } from '@context/ToastContext';
import TeodriveButton from '@components/TeodriveButton/TeodriveButton';
import { usePlan } from '@context/PlanContext';
import Wrap from '@components/common/Wrap/Wrap';
import TeodriveInput from '@components/TeodriveInput/TeodriveInput';
import css from './Novedades.module.css';
import { Cancel01 } from '@icons/index';

function Novedades() {
  // const [searchParams, setSearchParams] = useSearchParams();

  // const { isPlan, upgradeAccount } = usePlan();

  // const id = nanoid();

  // const { toast } = useToast();

  // const devURL = 'http://localhost:3000/payments/purchase-plan';
  // const apiURL = 'https://api.teodrive.com/payments/purchase-plan';

  // const createPayment = async () => {
  //   try {
  //     const { data } = await axios.post(apiURL, {
  //       user_order_id: id,
  //       user_order_email: 'keylordani@gmail.com',
  //     });

  //     console.log(data);
  //     const checkoutUrl = data;

  //     window.location.href = checkoutUrl;
  //   } catch (error) {
  //     console.error('Error fetching:', error);
  //     throw error;
  //   }
  // };

  // const getOrderIdParam = searchParams.get('user_order_id');
  // const getEmailParam = searchParams.get('user_email');

  // const handlePaymetValidation = async (orderId, email) => {
  //   console.log(`Validating order ${orderId} with email ${email}`);
  //   return 'Orden completada!';
  // };

  // const shouldFetch = !!getOrderIdParam && !!getEmailParam;

  // const orderValidation = useQuery(
  //   ['payment_order_validation'],
  //   () => handlePaymetValidation(getOrderIdParam, getEmailParam),
  //   {
  //     enabled: shouldFetch,
  //     onSuccess: () => {
  //       toast('Orden completada');
  //     },
  //     onError: (error) => {
  //       console.error('Validation failed', error);
  //     },
  //   }
  // );

  // const addOrUpdateSearchParam = (key, value) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set(key, value);
  //   setSearchParams(params);
  // };

  return (
    <Page
      title='Novedades - Teodrive'
      metaDesc='Registro de cambios de actualizaciones de Teodrive'
      canonical='novedades'
    >
      <Wrap
        direction='column'
        width='fit-content'
        className={css.DeleteAccountModal}
      >
        <Wrap justify='space-between' align='center' width='100%' className={css.modalHeader}>
          <h1 className={css.title}>Eliminar cuenta</h1>
          <button type='button' className={css.closeBtn}>
            <Cancel01 size={20} />
          </button>
        </Wrap>
        <Wrap
          direction='column'
          rowGap='1.5rem'
          width='100%'
          className={css.modalContent}
        >
          <Wrap direction='column'>
            <p className={css.caption}>
              ¿Está seguro de que desea eliminar su cuenta?
            </p>
            <p className={css.alert}>
              Esta acción es permanente e irreversible.
            </p>
          </Wrap>
          <TeodriveInput inputLabel='Escriba "Eliminar cuenta" a continuación para continuar.' style={{ width: '400px' }} />
        </Wrap>
        <Wrap justify='flex-end' width='100%' className={css.modalBottom}>
          <button type='button' className={css.deleteBtn}>
            Eliminar cuenta
          </button>
        </Wrap>
      </Wrap>
    </Page>
  );
}
export default Novedades;
