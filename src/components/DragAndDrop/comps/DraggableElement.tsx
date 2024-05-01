import { FC, useMemo } from "react";
import { Draggable } from "../primitives/Draggable";
import styles from "./DraggableElement.module.scss";

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
      </div>
    </Draggable>
  );
};
