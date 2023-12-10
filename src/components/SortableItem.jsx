import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";

const SortableItem = ({ id }) => {
  const disabled = id === "1" || id === "4";
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || disabled ? 0.5 : 1,
    display: 'inline-block',
    backgroundColor: isDragging ? 'red' : 'white'
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners} id={id}>
      <Item id={id} />
    </div>
  );
};

export default SortableItem;
