// ** React Imports
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../store/api/index";

// ** Defaults
const rawUser = localStorage.getItem('user');
let user = null
try {
  user = JSON.parse(rawUser)
} catch (_) {
  // USER not found
}
const defaultProvider = {
  user: user,
  saveToken: () => null,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(defaultProvider.user);

  const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')

  }

  const signIn = (username, password) => {
    return api.post({ url: "auth/signin", formData: {username, password} }).then((data, err)=>{
      if(data.status==200){

        saveUser({
          ...data.data,
          trackingItem: data.data.tracking_item,
          wifiPassword: data.data.wifi_password
        })
        navigate('/')
      }
    })
  }

  const saveCredentials = (ssid, wifiPassword, trackingItem) => {
    return api.post({
      url: `users/${user.username}`, 
      body: {ssid, wifi_password: wifiPassword, tracking_item: trackingItem}
    }).then((data, err)=>{
      if(data.status==200){
        saveUser({
          ...user,
          ssid,
          wifiPassword,
          trackingItem,
          token: data.data
        })
      }
    })
  }

  const values = {
    user,
    signIn,
    saveCredentials,
    signOut
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };