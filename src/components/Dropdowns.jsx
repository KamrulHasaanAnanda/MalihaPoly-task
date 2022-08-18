import React from "react";
import dropdown from "../assets/image/down.png";
import up from "../assets/image/up.png";
import Text from "./Text";

function Dropdowns({
  title,
  children,
  ImageName,
  changeImage,
  headerBackground,
}) {
  let imgSrc = ImageName === title ? up : dropdown;

  return (
    <div className="dropdown-div">
      <div
        className="dropdown-header"
        style={{ background: headerBackground }}
        onClick={() => changeImage(title)}
      >
        <Text fontSize={"18px"} fontWeight="600">
          {title}
        </Text>
        <img src={imgSrc} alt="" />
      </div>
      <div
        className={
          ImageName === title ? "dropdown-items show" : "dropdown-items"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdowns;
