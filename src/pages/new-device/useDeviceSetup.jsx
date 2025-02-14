import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useDevices } from "../../hooks/useDevices";
import { useAuth } from "../../context/AuthContext";
import useModels from "./useModels";
import { useParams } from "react-router-dom";

const useDeviceSetup = () => {

  const { user } = useAuth()
  const {models} = useModels()
  const {devices, getDevices} = useDevices()
  const [step, setStep] = useState(0)

  const newDeviceObj = {
    name: "",
    ssid: user.ssid,
    ssid_password: user.wifiPassword,
    tracking_item: user.trackingItem,
    model: null,
    modeltype: null
  }

  const [editDevice, _setEditDevice] = useState()

  const saveEditedDevice = async (editDevice) => {
    return api.post({ url: `device`, body: editDevice }).then((data, err) => {
      getDevices()
      setStep(5)
    });
  }

  const params = useParams()
  const { device: newDevice } = params;


  useEffect(() => {
    setStep(0)
  }, [newDevice])

  const setEditDevice = (editDevice) => {
    if (step === 5){
      _setEditDevice(null)
      setStep(0)
      return
    }
    if (step === 3 && !editDevice.modeltype){
      saveEditedDevice(editDevice)
      return
    }
    if (step === 4){
      saveEditedDevice(editDevice)
      return
    }
    _setEditDevice(editDevice)
    setStep(step + 1)
  }


  return {step, devices: newDevice ? [...devices, {...newDeviceObj, name: newDevice}] : devices, newDevice, setEditDevice, editDevice, models, newDeviceObj, setStep}
}

export default useDeviceSetup;