import React from "react";

function Text({
  children,
  className,
  fontSize,
  fontWeight,
  color,
  textAlign,
  margin,
  borderBottom,
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        fontFamily: "sans-serif",
        textAlign: textAlign,
        borderBottom: borderBottom,
      }}
    >
      {children}
    </p>
  );
}

export default Text;
