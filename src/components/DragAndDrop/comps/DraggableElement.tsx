import { FC, useMemo } from "react";
import { Draggable } from "../primitives/Draggable";
import styles from "./DraggableElement.module.scss";
import TimeIcon from "../../../assets/time.svg";

interface IDraggableElement {
  identifier: string;
  content: string;
}

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
  content,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);

  return (
    <Draggable id={itemIdentifier}>
      <div className={styles.elementWrapper}>
        <h3 className={styles.elementText}>{content}</h3>
        <p className={styles.description}>Сшить 10 штук футболок</p>
        <div className={styles.wrapper}>
          <TimeIcon/>
          <p className={styles.date}>15 апреля</p>
        </div>
      </div>
    </Draggable>
  );
};