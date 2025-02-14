import { useEffect, useState } from "react";
import { api } from "../../store/api/index";

const useModels = () => {

  const [ models, setModels ] = useState({supervised: [], unsupervised: []});

  useEffect(() => {
    api.get({ url: `${process.env.BACKEND_URL}/train/saved_models/v2` }).then((data, err)=>{
      setModels(data.data.map(e => ({...e, path: process.env.BACKEND_URL +e.path})));
    });
  },[]);

  return {models}
}

export default useModels;