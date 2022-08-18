import React, { useReducer } from "react";
import ItemServices from "../api/ItemServices";
import ItemCreate from "./ItemCreate";
import ItemInformationlist from "./ItemInformationlist";

function ItemPage() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      moduleNow: "itemInfo",
      items: "",
    }
  );

  let getItems = async () => {
    const response = await ItemServices.getItem();
    setState({ items: response });
  };

  const changeModule = (module) => {
    setState({ moduleNow: module });
  };
  let componentNow = "";
  if (state.moduleNow === "itemInfo")
    componentNow = (
      <ItemInformationlist
        changeModule={changeModule}
        getItems={getItems}
        items={state.items}
      />
    );
  else if (state.moduleNow === "itemCreate")
    componentNow = (
      <ItemCreate changeModule={changeModule} getItems={getItems} />
    );

  return componentNow;
}

export default ItemPage;
