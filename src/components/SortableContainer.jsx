import React from "react";
import WithContext from "./WithContext";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import "./SortableContainer.css";
import Container from "./Container";

const SortableContainer = ({ id, data }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={data} strategy={rectSortingStrategy}>
      <Container>
      <div ref={setNodeRef} style={{display: 'inline-block'}}>
        {data.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </div>
      </Container>
    </SortableContext>
  );
};

export default WithContext(SortableContainer);
