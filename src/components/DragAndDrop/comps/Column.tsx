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
  name: string;
  elements: IElement[];
  style: string; 
}

export const Column: FC<IColumn> = ({ name, style, elements }) => {
  console.log("Column Props:", { elements });
  const columnIdentifier = useMemo(() => style.toLowerCase(), [style]);

  return (
    <div className={styles.columnWrapper}>
      <div className={`${styles.columnHeaderWrapper} ${styles[columnIdentifier]}`}>
        <h3 className={styles.heading}>{name}</h3>
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