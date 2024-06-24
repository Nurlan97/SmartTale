import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import { DeleteImg } from '../../assets';
import { typePlaceAdvStore } from '../../store';
import { ImageExt } from '../../store/adStore';
import styles from './sortableImage.module.scss';
type Props = {
  image: ImageExt;
  store: typePlaceAdvStore;
  disabled?: boolean;
  //   setImages: React.Dispatch<React.SetStateAction<ImageExt[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: () => void;
};
function SortableImage({
  image,
  store,
  //   setImages,
  setIsOpen,
  setCurrent,
  disabled,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: image.id,
      data: { image },
      disabled,
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) return <div className={styles.emptyImage}></div>;
  return (
    <div
      className={styles.image}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <label htmlFor={`current${image.id}`} className={styles.inputPhotoFilled}>
        <img className={styles.smallImg} src={image.url} alt='Change' />
        {!disabled ? (
          <>
            <div className={styles.changeImage}>Change photo</div>
            <button
              className={styles.deleteImage}
              onClick={() => {
                store.deleteImg(image.id);
                //  setImages((prev) => {
                //    return prev.filter((img) => img.id !== image.id);
                //  });
              }}
              type='button'
            >
              <DeleteImg />
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.viewImage}
              onClick={() => {
                setCurrent();
                setIsOpen(true);
              }}
              type='button'
            >
              <div className={styles.changeImage}>view photo</div>
            </button>
          </>
        )}
      </label>
      <input
        disabled={disabled}
        id={`current${image.id}`}
        type='file'
        className={styles.hiddenInput}
        onChange={(ev) => {
          if (!ev.target.files) return;
          const imageFile = ev.target.files[0];
          store.updateImg(imageFile, image.id);
          //  setImages((prev) =>
          //    prev.map((img) => {
          //      if (img.id === image.id) {
          //        return {
          //          file: imageFile,
          //          url: URL.createObjectURL(imageFile),
          //          id: uuidv4(),
          //        };
          //      } else {
          //        return img;
          //      }
          //    }),
          //  );
          //  store.replaceImage(ev.target.files[0], ind);
        }}
      />
    </div>
  );
}

export default SortableImage;
