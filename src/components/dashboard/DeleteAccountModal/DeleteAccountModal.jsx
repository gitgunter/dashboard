import ModalWrap from '@components/common/ModalWrap/ModalWrap';

const DeleteAccountModal = ({ isVisible, onClose }) => {
  return (
    <ModalWrap isVisible={isVisible} onClose={onClose} key='deleteAccount'>
      <div>
        <h1>Eliminar cuenta</h1>
        <p>¿Está seguro de que desea eliminar su cuenta?</p>
        <p>Esta acción es permanente e irreversible.</p>
      </div>
    </ModalWrap>
  );
};
export default DeleteAccountModal;
