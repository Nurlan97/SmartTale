
import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column, IElement } from "./comps/Column";
import styles from "./DragAndDrop.module.scss";
import * as _ from "radash";
import timeIcon from "../../assets/time.svg";

const COLUMNS = ["Новые", "В работе", "Проверка", "Отправка", "Прибыл"];
export const DEFAULT_COLUMN = "новые";

const DEFAULT_DATA_STATE: IElement[] = [
  {
    id: _.uid(6),
    content: "Заказ №2456",
    column: DEFAULT_COLUMN,
  },
  {
    id: _.uid(7),
    content: "Заказ №2456",
    column: DEFAULT_COLUMN,
  },
  {
    id: _.uid(8),
    content: "Заказ №2456",
    column: DEFAULT_COLUMN,
  },
];

export const DragAndDrop = () => {
  const [data, setData] = useState<IElement[]>(DEFAULT_DATA_STATE);

  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const elementId = active.id;
      const deepCopy = [...data];

      const updatedState = deepCopy.map((elm): IElement => {
        if (elm.id === elementId) {
          const column = over?.id ? String(over.id) : elm.column;
          return { ...elm, column };
        }
        return elm;
      });
      setData(updatedState);
    },
    [data, setData]
  );

  return (
    <DndContext onDragEnd={handleOnDragEnd}>
      <div className={styles.dragAndDrop}>
        {COLUMNS.map((column, columnIndex) => (
          <Column
            key={`column-${columnIndex}`}
            heading={column}
            elements={_.select(
              data,
              (elm) => elm,
              (f) => f.column === _.camel(column)
            )}
          />
        ))}
      </div>
    </DndContext>
  );
};
