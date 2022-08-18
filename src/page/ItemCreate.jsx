import React, { useState } from "react";
import ItemServices from "../api/ItemServices";
import { toastifyAlertSuccess } from "../components/alert/tostifyALert";
import Text from "../components/Text";

function ItemCreate({ changeModule, getItems }) {
  const [itemName, setItemName] = useState("");

  const saveItem = async () => {
    let response = await ItemServices.addItem({ itemName: itemName });
    // console.log("response :>> ", response);
    if (response.status === 200) {
      setItemName("");
      getItems();
      changeModule("itemInfo");
      toastifyAlertSuccess("Added Successfully", "top-right");
    }
  };
  return (
    <div className="item-list">
      <div className="item-list-header">
        <Text
          fontSize="30px"
          fontWeight="500"
          color="#e91e63"
          textAlign={"center"}
        >
          Add Item:
        </Text>
        <button onClick={() => changeModule("itemInfo")}>Item info list</button>
      </div>
      <div className="item-create-input">
        <input
          name="itemName"
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Write item name"
          value={itemName}
        />
        <button className="btn-save " onClick={saveItem}>
          {" "}
          Create
        </button>
      </div>
    </div>
  );
}

export default ItemCreate;
