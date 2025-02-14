
import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useAuth } from "../../context/AuthContext";

const useAnnotation = () => {

  const {user} = useAuth()
  
  const [ images, setImages ] = useState([]);
  const setParcedImages = (imgs) => {
    setImages([...imgs.map(e => ({...e, url: process.env.DEVICE_BACKEND_URL + '/' + e.url }))])
  }

  const getImages = () => {
    api.get({ url: `annotation` }).then((data, err) => {
      setParcedImages(data.data);
    });
  }

  const addNewImages = (files) => {
    let formData = new FormData()
    for (let file of files) {
      formData.append('files', file); 
    }
    api.post({ url: `annotation`, formData }).then((data, err) => {
      if (err)
        return
      setParcedImages(data.data)
    });
  }

  const updateImage = (image) => {
    api.put({ url: `annotation`, body: {...image, shapes: JSON.stringify(image.shapes)} }).then((data, err) => {
      if (err)
        return
      setParcedImages(data.data);
    });
  }
  
  const deleteImage = (image) => {
    console.log(images, image)
    api.delete({ url: `annotation/${image.id}` }).then((data, err) => {
      if (err)
        return
      setImages(images.filter( img => img.id !== image.id ));
    });
  }
  

  useEffect(() => {
    getImages()
  }, [user.id]);

  return {images, addNewImages, updateImage, deleteImage}
}

export default useAnnotation;