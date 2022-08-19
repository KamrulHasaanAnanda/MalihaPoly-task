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
  unitId,
  itemId,
}) {
  let imgSrc = ImageName === title ? up : dropdown;

  let changeValues = () => {
    console.log("title", title);
    console.log("unitId", unitId);
    console.log("itemId", itemId);

    changeImage(title, unitId, itemId);
  };
  return (
    <div className="dropdown-div">
      <div
        className="dropdown-header"
        style={{ background: headerBackground }}
        onClick={changeValues}
      >
        <Text fontSize={"18px"} fontWeight="600">
          {title}
        </Text>
        <img src={imgSrc} alt="" />
      </div>
      <div
        className={
          ImageName === title && unitId === itemId
            ? "dropdown-items show"
            : "dropdown-items"
        }
      >
        {unitId === itemId && children}
      </div>
    </div>
  );
}

export default Dropdowns;
