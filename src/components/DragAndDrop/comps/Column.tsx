import { FC, useMemo } from "react";
import { Droppable } from "../primitives/Droppable";
import { DraggableElement } from "./DraggableElement";
import styles from "./Column.module.scss";

export interface IElement {
  id: string;
  content: string;
  column: string;
}

interface IColumn {
  heading: string;
  elements: IElement[];
}

export const Column: FC<IColumn> = ({ heading, elements }) => {
  const columnIdentifier = useMemo(() => heading.toLowerCase().replace(/\s/g, ""), [heading]);

  return (
    <div className={styles.columnWrapper}>
      <div className={`${styles.columnHeaderWrapper} ${styles[columnIdentifier]}`}>
        <h3 className={styles.heading}>{heading}</h3>
      </div>
      <Droppable id={columnIdentifier}>
        {elements.map((elm, elmIndex) => (
          <DraggableElement
            key={`draggable-element-${elmIndex}-${columnIdentifier}`}
            identifier={elm.id}
            content={elm.content}
          />
        ))}
        <div className={styles.dropPlaceholder} />
      </Droppable>
    </div>
  );
};
