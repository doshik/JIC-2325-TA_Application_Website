import React from "react";

const DefaultHeader = ({ text = "Pass In the 'text' prop to change this" }) => {
  return <div style={styles.headerText}>{text}</div>;
};

export default DefaultHeader;

const styles = {
  headerText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#B3A369",
    padding: "1rem",
  },
};
