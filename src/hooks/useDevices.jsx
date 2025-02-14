import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../store/api/index";

const defaultProvider = {
  devices: [],
  getDevices: ()=>{}
};

const DevicesContext = createContext(defaultProvider);

const DevicesProvider = ({ children }) => {
  
  const [devices, setDevices] = useState([]);

  const getDevices = () => {
    api.get({ url: `devices` }).then((data, err) => {
      if (data.status == 200) {
        setDevices(data.data)
      }
    });
  }

  useEffect(() => {
    getDevices()
  }, [])

  const values = {
    devices,
    getDevices
  };

  return <DevicesContext.Provider value={values}>{children}</DevicesContext.Provider>;
};

const useDevices = () => useContext(DevicesContext);

export { DevicesContext, DevicesProvider, useDevices };