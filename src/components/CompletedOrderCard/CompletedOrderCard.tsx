import React, { useState } from 'react';
// import Modal from './Modal';
import styles from './CompletedOrderCard.module.scss';
import order_img from "../../assets/order-img.png";

interface CardProps {
  image: string;
  price: number;
  title: string;
  description: string;
  date: string;
}

const CompletedOrderCard: React.FC<CardProps> = ({ image, price, title, description, date }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
        <div  className={styles.wrapper}>
            <img src={order_img} alt={title} className={styles.orderimg}/>
            <div className={styles.content}>
                <p className={styles.title}>2000 сом</p>
                <h3>Швейная машинка</h3>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>
            </div>
        </div>
        <div className={`${styles.content} ${styles.second}`}>
            <p>2 апреля 2024</p>
            <button onClick={handleModalOpen} className={styles.more_button}>Посмотреть детали</button>
        </div>
      {/* {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2>{title}</h2>
          <img src={image} alt={title} />
          <p>{description}</p>
          <p>Date: {date}</p>
          <p>Price: ${price}</p>
        </Modal>
      )} */}
    </div>
  );
};

export default CompletedOrderCard;
