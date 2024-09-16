import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ModalData {
  src: string;
  alt: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData;
}

export default function ImageModal({ isOpen, onClose, data }: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button type="button" className={styles.close} onClick={onClose}>
        Close
      </button>
      <img src={data.src} alt={data.alt} />
    </Modal>
  );
}
