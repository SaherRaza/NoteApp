// SelectedDataContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { clients,categories } from "./data";

const SelectedDataContext = createContext();

export const SelectedDataProvider = ({ children }) => {
  
  const [client, setClient] = useState(clients);
 // const [category, setCategory] = useState(categories);

 const [clientName,setClientName] = useState("");
 const getClientName = async() => {
   const result = await AsyncStorage.getItem("selectedClient");
   setClientName(JSON.parse(result));
 }


  const setSelection = async () => {
   const clients=  await AsyncStorage.setItem('clientList', JSON.stringify(client));
    setClient(clients);
  console.log("=======",client);
  };

  useEffect(() => {
    getClientName();
    setSelection();
  }, [])
 
  return (
    <SelectedDataContext.Provider
      value={{ client, setSelection, setClient ,clientName}}
    >
      {children}
    </SelectedDataContext.Provider>
  );
};

export const useSelectedData = () => {
  const context = useContext(SelectedDataContext);
  if (!context) {
    throw new Error(
      "useSelectedData must be used within a SelectedDataProvider"
    );
  }
  return context;
};
