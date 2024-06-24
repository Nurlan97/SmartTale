import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import { DeleteImg } from '../../assets';
import { typePlaceAdvStore } from '../../store';
import { ImageExt } from '../../store/adStore';
import styles from './dragableImage.module.scss';
type Props = {
  image: ImageExt;
};
const DragableImage = ({ image }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: image.id,
    data: { image },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className={styles.image}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img className={styles.smallImg} src={image.url} alt='Change' />
    </div>
  );
};

export default DragableImage;
