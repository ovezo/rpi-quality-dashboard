import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useAuth } from "../../context/AuthContext";


const defaultProvider = {
  classes: [], 
  getClasses: ()=>{}, 
  addNewClass: ()=>{}, 
  updateClass: ()=>{}, 
  deleteClass: ()=>{}
};

const ClassesContext = createContext(defaultProvider);

const ClassesProvider = ({ children }) => {
  
  const {user} = useAuth()
  
  const [ classes, setClasses ] = useState([]);

  const getClasses = () => {
    api.get({ url: `annotation-class` }).then((data, err) => {
      setClasses(data.data);
    });
  }

  const addNewClass = (newClass) => {
    newClass.user_id = user.id
    api.post({ url: `annotation-class`, body: newClass }).then((data, err) => {
      if (err)
        return
      setClasses(data.data);
    });
  }

  const updateClass = (aClass) => {
    aClass.user_id = user.id
    api.put({ url: `annotation-class`, body: aClass }).then((data, err) => {
      if (err)
        return
      setClasses(data.data);
    });
  }
  
  const deleteClass = (aClass) => {
    api.delete({ url: `annotation-class/${aClass.id}` }).then((data, err) => {
      if (err)
        return
      setClasses(classes.filter( cls => cls.id !== aClass.id ));
    });
  }
  

  useEffect(() => {
    if (!user?.id)
      return
    getClasses()
  }, [user?.id]);

  const values = {classes, getClasses, addNewClass, updateClass, deleteClass};

  return <ClassesContext.Provider value={values}>{children}</ClassesContext.Provider>;
};

const useClasses = () => useContext(ClassesContext);

export { ClassesContext, ClassesProvider, useClasses };
