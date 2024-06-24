import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Cross } from '../../assets';
import { modalStore } from '../../store';
import { Modals } from '../../store/modalStore';
import ChangePhotoModal from '../ChangePhotoModal/ChangePhotoModal';
import ChoiseModal from '../ChoiseModal/ChoiseModal';
import DescriptionModal from '../DescriptionModal/DescriptionModal';
import InviteEmployerModal from '../InviteEmployerModal/InviteEmployerModal';
import ModalLoader from '../ModalLoader/ModalLoader';
import SimpleModal from '../SimpleModal/SimpleModal';
import TaskDescription from '../TaskDescription/TaskDescription';
import styles from './modalContainer.module.scss';

const ModalContainer = observer(() => {
  const map = new Map();
  map.set(Modals.closeOrder, <SimpleModal />);
  map.set(Modals.errorOrder, <SimpleModal />);
  map.set(Modals.errorValidation, <SimpleModal />);
  map.set(Modals.successChanges, <SimpleModal />);
  map.set(Modals.successOrder, <SimpleModal />);
  map.set(Modals.successPurchase, <SimpleModal />);
  map.set(Modals.successSubscribe, <SimpleModal />);
  map.set(Modals.deleteAd, <ChoiseModal />);
  map.set(Modals.hideAd, <ChoiseModal />);
  map.set(Modals.deleteJob, <ChoiseModal />);
  map.set(Modals.hideJob, <ChoiseModal />);
  map.set(Modals.exit, <ChoiseModal />);
  map.set(Modals.descriptionModal, <DescriptionModal />);
  map.set(Modals.changePhotoModal, <ChangePhotoModal />);
  map.set(Modals.inviteEmployer, <InviteEmployerModal />);
  map.set(Modals.taskDescription, <TaskDescription />);
  map.set(Modals.loader, <ModalLoader />);

  if (modalStore.currentModal === Modals.loader) {
    return (
      <Modal
        isOpen={modalStore.isOpen}
        overlayClassName={styles.overlay}
        className={styles.loader}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <ModalLoader />
      </Modal>
    );
  }
  return (
    <Modal
      isOpen={modalStore.isOpen}
      onRequestClose={modalStore.closeModal}
      className={styles.modal}
      style={{
        content: {
          backgroundColor: `${
            modalStore.currentModal === 'inviteEmployer' ? 'rgba(248, 249, 250, 1)' : ''
          }`,
        },
      }}
      overlayClassName={styles.overlay}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <button className={styles.closeBtn} onClick={modalStore.closeModal}>
        <Cross />
      </button>
      {modalStore.currentModal && map.get(modalStore.currentModal)}
    </Modal>
  );
});

export default ModalContainer;
