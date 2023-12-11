import React from "react";

import "./Item.css";

const Item = ({ id, dragOverlay, style = {} }) => {
  const styleIn = {
    ...style,
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div style={styleIn} className="item">
      {id}
    </div>
  );
};

export default Item;
