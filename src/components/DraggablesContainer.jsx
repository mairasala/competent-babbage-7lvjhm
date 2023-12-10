import React from "react";
import Container from "./Container";
import DraggableItem from "./DraggableItem";

const DraggableContainer = ({ data, id }) => {
  return (
    <Container>
       <div style={{display: 'inline-block'}}>
      {data.map((itemId) => (
        <DraggableItem key={itemId} id={itemId} container={id} />
      ))}
      </div>
    </Container>
  );
};

export default DraggableContainer;
