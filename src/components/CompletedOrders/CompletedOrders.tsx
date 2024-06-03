import Button from "../../UI/Button/Button";
import styles from "./CompletedOrders.module.scss";
import { useState } from 'react';
import CompletedOrderCard from "../CompletedOrderCard/CompletedOrderCard";
import DateSorter from "../DateSorter/DateSorter";

const CompletedOrders: React.FC = () => {
    const [active, setActive] = useState<'current' | 'completed'>('completed');

    const handleSetActive = (type: 'current' | 'completed') => {
        setActive(type);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>История заказов</h3>
            <div className={styles.wrapper}>
                <div className={styles.buttonGroup}>
                    <Button
                        color={active === 'current' ? 'orange' : 'white'}
                        type='button'
                        handler={() => handleSetActive('current')}
                    >
                        Текущие
                    </Button>
                    <Button
                        color={active === 'completed' ? 'orange' : 'white'} 
                        type='button'
                        handler={() => handleSetActive('completed')} 
                    >
                        Выполненные
                    </Button>
                </div>
                <DateSorter/>
            </div>
            
            {active === 'completed' && <CompletedOrderCard
                image="path/to/image.jpg"
                price={10}
                title="Example Title"
                description="Example Description"
                date="2024-05-02"
            />}
            
        </div>
    );
}

export default CompletedOrders;