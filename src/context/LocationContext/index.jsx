import React, { createContext, useContext, useState, useEffect } from 'react';
import LocationModal from './LocationModal';
import { api } from '../../store/api';
import { useAlert } from '../AlertContext';

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  
  const [createLocation, setCreateLocation] = useState(false)

  const [locations, setLocations] = useState([]);
  const { showAlert } = useAlert();

  const getLocations = () => {
    api.get({ url: 'locations' })
      .then((data) => {
        if (data.status === 200) {
          setLocations(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        showAlert('error', 'Failed to load locations');
      });
  };

  useEffect(() => {
    getLocations();
  }, []);

  const handleSave = (location) => {
    api.post({ url: 'locations', body: location })
      .then((data) => {
        if (data.status === 200) {
          setLocations(data.data);
          showAlert('success', 'Location added successfully!');
          return data.data;
        } else {
          showAlert('error', 'Failed to add location');
          return null;
        }
      })
      .catch((error) => {
        console.error("Error adding location:", error);
        showAlert('error', 'Failed to add location');
        return null;
      });
  };

  return (
    <LocationsContext.Provider value={{ setCreateLocation, locations }}>
      {children}
      <LocationModal
        isOpen={createLocation}
        onSave={handleSave}
        triggerModal={setCreateLocation}
      />
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error('useLocations must be used within an LocationsProvider');
  }
  return context;
};