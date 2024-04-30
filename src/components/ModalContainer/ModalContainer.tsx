import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Cross } from '../../assets';
import { modalStore } from '../../store';
import ChangePhotoModal from '../ChangePhotoModal/ChangePhotoModal';
import ChoiseModal from '../ChoiseModal/ChoiseModal';
import DescriptionModal from '../DescriptionModal/DescriptionModal';
import InviteEmployerModal from '../InviteEmployerModal/InviteEmployerModal';
import SimpleModal from '../SimpleModal/SimpleModal';
import styles from './modalContainer.module.scss';

const ModalContainer = observer(() => {
  const modalsObj = {
    choiseModal: <ChoiseModal />,
    simpleModal: <SimpleModal />,
    descriptionModal: <DescriptionModal />,
    changePhotoModal: <ChangePhotoModal />,
    inviteEmployer: <InviteEmployerModal />,
  };
  return (
    <Modal
      isOpen={modalStore.isOpen}
      onRequestClose={modalStore.closeModal}
      className={styles.modal}
      style={{
        content: {
          backgroundColor: `${
            modalStore.currentType === 'inviteEmployer' ? 'rgba(248, 249, 250, 1)' : ''
          }`,
        },
      }}
      overlayClassName={styles.overlay}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <button className={styles.closeBtn} onClick={modalStore.closeModal}>
        <Cross />
      </button>
      {modalStore.currentType && modalsObj[modalStore.currentType]}
    </Modal>
  );
});

export default ModalContainer;
