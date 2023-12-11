import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Item from "./Item";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem = ({ id, container }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id,
    data: {
      container,
    },
  });

  /*const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "red" : "yellow",
    display: "inline-block",
  };*/
  const style = isDragging ? {
    position: 'absolute',
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    cursor: 'move',
    backgroundColor: 'red',
    display: 'inline-block',
    opacity: 0.5
  } :
  {
    cursor: 'pointer',
    backgroundColor: "yellow",
    display: 'inline-block',
  }

  return (
    <>
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Item id={id} />
    </div>
    {isDragging && <div style={{display: 'inline-block',  backgroundColor: "yellow"}}><Item id={id} style={{ display: 'none !important' }}/></div>}
    </>
  );
};

export default DraggableItem;
