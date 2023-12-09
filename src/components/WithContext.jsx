import React from "react";
import Context from "./Context";

const WithContext = (Component) => {
  const MemoComponent = React.memo(Component);

  return (compProps) => (
    <Context.Consumer>
      {(props) => <MemoComponent {...compProps} {...props} />}
    </Context.Consumer>
  );
};

export default WithContext;
