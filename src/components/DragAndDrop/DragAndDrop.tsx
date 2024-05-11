// import { useCallback, useState } from "react";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { Column, IElement } from "./comps/Column";
// import styles from "./DragAndDrop.module.scss";
// import * as _ from "radash";

// const COLUMNS = [
//   { name: "В ожидании", style: "expecting" },
//   { name: "В работе", style: "inProgress" },
//   { name: "Проверка", style: "checking" },
//   { name: "Отправка", style: "sent" },
//   { name: "Прибыл", style: "delivered" }
// ];

// // export const DEFAULT_COLUMN = "вожидании";
// export const DEFAULT_COLUMN = COLUMNS[0].name;
// // console.log(DEFAULT_COLUMN);

// const DEFAULT_DATA_STATE: IElement[] = [
//   {
//     id: _.uid(6),
//     content: "Заказ №2456",
//     column: DEFAULT_COLUMN,
//   },
//   {
//     id: _.uid(7),
//     content: "Заказ №2456",
//     column: DEFAULT_COLUMN,
//   },
//   {
//     id: _.uid(8),
//     content: "Заказ №2456",
//     column: DEFAULT_COLUMN,
//   },
// ];

// export const DragAndDrop = () => {
//   const [data, setData] = useState<IElement[]>(DEFAULT_DATA_STATE);
//   console.log(data, "my data")
//   // const handleOnDragEnd = useCallback(
//   //   ({ active, over }: DragEndEvent) => {
//   //     const elementId = active.id;
//   //     const deepCopy = [...data];
  
//   //     const activeElement = deepCopy.find((elm) => elm.id === elementId);
  
//   //     if (activeElement && over) {
//   //       const overColumnIndex = COLUMNS.findIndex((column) => column.name === over.id);
//   //       const activeColumnIndex = COLUMNS.findIndex((column) => column.name === activeElement.column);
      
//   //       if (activeColumnIndex === 0 && overColumnIndex === 1) {
//   //         activeElement.column = COLUMNS[1].name; // Move to the second column
//   //       } else if (activeColumnIndex === 1 && (overColumnIndex === 0 || overColumnIndex === 2)) {
//   //         activeElement.column = String(over.id); // move to the first or third column
//   //       } else if (activeColumnIndex === 2 && (overColumnIndex === 1 || overColumnIndex === 3)) {
//   //         activeElement.column = String(over.id); // move to the second or fourth column
//   //       }
  
//   //       setData(deepCopy);
//   //     }
//   //   },
//   //   [data, setData]
//   // );
//    const handleOnDragEnd = useCallback(
//     ({ active, over }: DragEndEvent) => {
//       const elementId = active.id;
//       const deepCopy = [...data];

//       const updatedState = deepCopy.map((elm): IElement => {
//         if (elm.id === elementId) {
//           const column = over?.id ? String(over.id) : elm.column;
//           return { ...elm, column };
//         }
//         return elm;
//       });
//       setData(updatedState);
//     },
//     [data, setData]
//   );
//   return (
//     <DndContext onDragEnd={handleOnDragEnd}>
//       <div className={styles.dragAndDrop}>
//         {COLUMNS.map((column, columnIndex) => (
//           <Column
//             key={`column-${columnIndex}`}
//             name={column.name}
//             style={column.style}
//             heading={column.name}
//             elements={_.select(
//               data,
//               (elm) => elm,
//               (f) => f.column === _.camel(column.name)
//             )}
//           />
//         ))}
//       </div>
//     </DndContext>
//   );
// };


import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column, IElement } from "./comps/Column";
import styles from "./DragAndDrop.module.scss";
import * as _ from "radash";

// const COLUMNS = ["Новые", "В работе", "Проверка", "Отправка", "Прибыл"];
// export const DEFAULT_COLUMN = "новые";
const COLUMNS = [
  { name: "В ожидании", style: "expecting" },
  { name: "В работе", style: "inProgress" },
  { name: "Проверка", style: "checking" },
  { name: "Отправка", style: "sent" },
  { name: "Прибыл", style: "delivered" }
];

export const DEFAULT_COLUMN = COLUMNS[0].name;

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
            style={column.style}
            name={column.name}
            elements={_.select(
              data,
              (elm) => elm,
              (f) => f.column === column.style
            )}
          />
        ))}
      </div>
    </DndContext>
  );
};
