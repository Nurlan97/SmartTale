import { useNavigate } from 'react-router-dom';

import { PositionSummary } from '../../api/data-contracts';
import Button from '../../UI/Button/Button';
import styles from './positionList.module.scss';

type Props = {
  positions: PositionSummary[];
};
const PositionsList = ({ positions }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {positions.map((position) => {
        return (
          <div key={position.positionId} className={styles.position}>
            <p>{position.title}</p>
            <Button
              color={'white'}
              height='36px'
              type={'button'}
              handler={() => {
                navigate(`/positions/update/${position.positionId}`);
              }}
            >
              Редактировать
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PositionsList;
