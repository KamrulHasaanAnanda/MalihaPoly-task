import React, { useEffect, useReducer } from "react";
import ItemServices from "../api/ItemServices";
import cross from "../assets/image/cross.png";
import plus from "../assets/image/plus.png";
import { toastifyAlertSuccess } from "../components/alert/tostifyALert";

import Dropdowns from "../components/Dropdowns";
import Input from "../components/Input";
import Text from "../components/Text";

function ItemInformationlist({ changeModule, getItems, items }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ImageName: "",
      InputName: false,
      unitName: "",
      subCategory: "",
      subCategories: "",
      units: "",
      unitId: "",
      subCatId: "",
    }
  );

  // console.log("items :>> ", items);
  const getUnits = async () => {
    const response = await ItemServices.getUnit();
    setState({ units: response });
  };
  const getSubCats = async () => {
    const response = await ItemServices.getSubCat();
    setState({ subCategories: response });
  };
  useEffect(() => {
    getUnits();
    getSubCats();
    getItems();
  }, []);

  const addName = async (name, stateName) => {
    if (state.InputName === name && stateName !== "") {
      let response =
        stateName === state.unitName
          ? await ItemServices.addUnit({ unitName: stateName })
          : stateName === state.subCategory
          ? await ItemServices.addSubCat({ subCategory: stateName })
          : "";
      if (response.status === 200) {
        getUnits();
        getSubCats();
        setState({ unitName: "", InputName: false, subCategory: "" });
        toastifyAlertSuccess("Added Successfully", "top-right");
      }
    }
    setState(
      state.InputName === name ? { InputName: "" } : { InputName: name }
    );
  };

  let changeImage = (title, Id, itemId) => {
    setState(
      state.ImageName === title
        ? { ImageName: "" }
        : { ImageName: title, unitId: Id, itemId: itemId }
    );
  };

  let unitItems = "";
  if (state.units?.length > 0) {
    unitItems = state?.units?.map((unit) => {
      // console.log("unit", unit);
      return (
        <option key={unit._id} value={unit._id} className="unitText">
          {unit.unitName}
        </option>
      );
    });
  }

  let subCategoryItems = "";
  if (state.subCategories?.length > 0) {
    subCategoryItems = state?.subCategories?.map((unit) => {
      // console.log("unit", unit);
      return (
        <option key={unit._id} value={unit._id} className="unitText">
          {unit.subCategory}
        </option>
      );
    });
  }
  let itemsView = "";
  if (items?.length > 0) {
    itemsView = items.map((item) => {
      let unitId = item._id;
      return (
        <tr key={item._id}>
          <td>
            <Dropdowns
              title={"Item types"}
              ImageName={state.ImageName}
              setImageName={setState}
            >
              <Text
                fontSize={"18px"}
                fontWeight="500"
                color={"white"}
                borderBottom="1px solid aliceblue"
              >
                Item 1
              </Text>
            </Dropdowns>
          </td>
          <td>
            <div className="info-name">
              <Text color="white" fontSize="17px">
                {item.itemName}
              </Text>
            </div>
          </td>
          <td>
            <div className="sub-cat">
              {state.InputName === "Sub category" ? (
                <Input
                  placeholder={"Add Sub category"}
                  name="subCategory"
                  onChange={setState}
                />
              ) : (
                <div className="drop">
                  <Dropdowns
                    title={"Sub category"}
                    ImageName={state.ImageName}
                    changeImage={changeImage}
                  >
                    {subCategoryItems}
                  </Dropdowns>
                </div>
              )}
              <img
                src={plus}
                alt=""
                onClick={() => addName("Sub category", state.subCategory)}
              />
            </div>
          </td>
          <td>
            <div className="sub-cat">
              {state.InputName === "Unit" ? (
                <Input
                  placeholder={"Add Unit"}
                  name="unitName"
                  onChange={setState}
                />
              ) : (
                <div className="drop">
                  <Dropdowns
                    title={"Unit"}
                    unitId={unitId}
                    ImageName={state.ImageName}
                    changeImage={changeImage}
                    itemId={item._id}
                    headerBackground={"#673ab7"}
                  >
                    {unitItems}
                  </Dropdowns>
                </div>
              )}
              <img
                src={plus}
                alt=""
                onClick={() => addName("Unit", state.unitName)}
              />
            </div>
          </td>
          <td>
            <div className="sub-cat">
              {state.InputName === "Stock Limit" ? (
                <Input placeholder={"Add Stock Limit"} />
              ) : (
                <div className="drop">
                  <Dropdowns
                    title={"Stock Limit"}
                    ImageName={state.ImageName}
                    setImageName={setState}
                    headerBackground={"#2196f3"}
                  >
                    <Text
                      fontSize={"18px"}
                      fontWeight="500"
                      color={"white"}
                      borderBottom="1px solid aliceblue"
                    >
                      Item 1
                    </Text>
                  </Dropdowns>
                </div>
              )}
              <img
                src={plus}
                alt=""
                onClick={() => addName("Stock Limit", state.stockName)}
              />
            </div>
          </td>
          <td>
            <div className="actions">
              <img src={cross} alt="" />
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="item-list">
      <div className="item-list-header">
        <Text
          fontSize="30px"
          fontWeight="500"
          color="#e91e63"
          textAlign={"center"}
        >
          Items Information:
        </Text>
        <button onClick={() => changeModule("itemCreate")}> Add item</button>
      </div>
      <div className="table-div">
        <table className="table">
          <thead>
            <tr>
              <th>
                <Text fontSize="20px" color="#607d8b">
                  Item Type
                </Text>
              </th>
              <th>
                <Text fontSize="20px" color="#607d8b">
                  Item name
                </Text>
              </th>
              <th>
                <Text fontSize="20px" color="#607d8b">
                  Sub category name
                </Text>
              </th>
              <th>
                <Text fontSize="20px" color="#607d8b">
                  Unit name
                </Text>
              </th>
              <th>
                <Text fontSize="20px" color="#607d8b">
                  Stock Limit
                </Text>
              </th>
              <th>
                <Text fontSize="20px" color="#607d8b">
                  Actions
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsView}

            <tr>
              <td colSpan={"3"}>
                <button className="btn-cancel">Cancel</button>
              </td>
              <td colSpan={"3"} style={{ textAlign: "end" }}>
                <button className="btn-save">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemInformationlist;
