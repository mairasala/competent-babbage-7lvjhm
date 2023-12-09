import React from "react";
import WithContext from "./WithContext";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import "./Droppable.css";

const Droppable = ({ id, data }) => {
  const { setNodeRef } = useDroppable({ id });
  console.log(data);

  return (
    <SortableContext id={id} items={data} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {data.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default WithContext(Droppable);
