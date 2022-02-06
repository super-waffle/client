import { useState } from "react";
import Modal from "./modal";

export default function TimePicker() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Modal open={modalOpen} close={closeModal} header=" ">
      <div>시간 설정</div>
    </Modal>
  );
}
