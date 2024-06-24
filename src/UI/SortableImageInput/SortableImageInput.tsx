import {
  Collision,
  DataRef,
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  Translate,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { MutableRefObject, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ImageModal from '../../components/ImageModal/ImageModal';
import { createPlaceAdvStore, typePlaceAdvStore } from '../../store';
import { ImageExt } from '../../store/adStore';
import DragableImage from '../DragableImage/DragableImage';
import SortableItem from '../SortableImage/SortableImage';
import styles from './sortableImagesInput.module.scss';
type Props = {
  store: typePlaceAdvStore;
  disabled?: boolean;
};
export interface DragEvent {
  activatorEvent: Event;
  active: {
    id: string;
    data: { current: { image: ImageExt } };
    rect: MutableRefObject<{
      initial: ClientRect | null;
      translated: ClientRect | null;
    }>;
  };
  collisions: Collision[] | null;
  delta: Translate;
  over: {
    id: string;
    rect: ClientRect;
    disabled: boolean;
    data: DataRef;
  } | null;
}
// const store = createPlaceAdvStore();
const SortableImageInput = observer(({ store, disabled = false }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);

  const [activeImg, setActiveImg] = useState<ImageExt | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const onDragStart = (event: DragStartEvent) => {
    event.active.data.current && setActiveImg({ ...event.active.data.current.image });
  };
  const onDragOver = async (event: DragEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    store.replaceImg(activeId, overId);
  };
  const onDragEnd = async (event: DragEvent) => {
    setActiveImg(null);
  };

  return (
    <div className={styles.wrapper}>
      {!!store.currImages.length && (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className={styles.imagesWrapper}>
            <SortableContext
              items={store.currImages}
              strategy={horizontalListSortingStrategy}
            >
              {store.currImages.map((image, ind) => (
                <SortableItem
                  key={image.id}
                  image={image}
                  store={store}
                  disabled={disabled}
                  //  setImages={setImages}
                  setCurrent={() => setCurrent(ind)}
                  setIsOpen={setIsOpen}
                />
              ))}
            </SortableContext>
          </div>
          <DragOverlay>{activeImg && <DragableImage image={activeImg} />}</DragOverlay>
        </DndContext>
      )}

      {store.currImages.length < 5 && !disabled && (
        <>
          <label htmlFor='newFile' className={styles.inputPhoto}>
            {<div className={styles.addFile}>+ Добавить файл</div>}
          </label>
          <input
            id='newFile'
            type='file'
            className={styles.hiddenInput}
            onChange={(ev) => {
              if (!ev.target.files) return;
              const imageFile = ev.target.files[0];
              store.addImg({
                file: imageFile,
                url: URL.createObjectURL(imageFile),
                id: uuidv4(),
              });
            }}
          />
        </>
      )}
      <ImageModal
        urls={store.currImages.map((img) => img.url)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
});

export default SortableImageInput;
