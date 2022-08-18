import axios from "axios";
const ItemServices = {};
let url = "http://localhost:5000/api";

ItemServices.addItem = async (data) => {
  const response = await axios.post(`${url}/add-item`, data);
  return response;
};
ItemServices.getItem = async () => {
  const response = await axios.get(`${url}/all-item`);
  return response.data;
};

ItemServices.getUnit = async () => {
  const response = await axios.get(`${url}/all-unitName`);
  return response.data;
};

ItemServices.addUnit = async (data) => {
  const response = await axios.post(`${url}/add-unitName`, data);
  return response;
};

ItemServices.getSubCat = async () => {
  const response = await axios.get(`${url}/all-subCategory`);
  return response.data;
};

ItemServices.addSubCat = async (data) => {
  const response = await axios.post(`${url}/add-subCategory`, data);
  return response;
};
export default ItemServices;
