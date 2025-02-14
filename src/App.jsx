import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Analytics from './pages/analytics';
import Monitoring from './pages/monitoring';
import VideoStream from './pages/real-time-alerting/index';
import CompanyProfile from './pages/dashboard/CompanyProfile';
import PageNotFound from './pages/utility/PageNotFound';
import Signin from './pages/signin';
import Credentials from './pages/credentials';
import ResetPassword from './pages/ResetPassword';
import NewListDevice from './pages/new-device';
import NewBluetoothDevice from './pages/new-device/BluetoothDevices';
import NewRTSPDevice from './pages/new-device/RTSPDevice';

import ProtectedRoutes from "./utils/ProtectedRoutes";
import Annotation from './pages/annotation';
import Training from './pages/training';
import PredictImage from './pages/predictImage';
import Settings from './archive/pages/settings/Account';
import Processes from './pages/processes';
import Machines from './pages/machines';
import Operators from './pages/operators';
import ProcessDetail from './pages/processDetail';
import Datasets from './pages/datasets';
import TrainedModels from './pages/trainedModels';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change



  return (
    <>
      <Routes>
        <Route exact path="/" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <CompanyProfile />
          </ProtectedRoutes>
        } />

        <Route path="/monitoring/devices" element={
          <ProtectedRoutes roles={['superadmin']}>
            <Monitoring />
          </ProtectedRoutes>
        } />

        <Route path="/reporting/analytics" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <Analytics />
          </ProtectedRoutes>
        } />

        <Route path="/real-time-alerting/:mac_address" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <VideoStream />
          </ProtectedRoutes>
        } />

        <Route path="/annotation/annotate" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <Annotation />    
          </ProtectedRoutes>
        } />

        <Route path="/quality-control/training" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <Training />
          </ProtectedRoutes>
        } />

        <Route path="/quality-control/predict" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <PredictImage />
          </ProtectedRoutes>
        } />

        <Route path="/devices/add-bluetooth-device" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <NewBluetoothDevice />
          </ProtectedRoutes>
        } />

        <Route path="/devices/add-rtsp-device" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <NewRTSPDevice />
          </ProtectedRoutes>
        } />

        <Route path="/devices/:device?" element={
          <ProtectedRoutes roles={['superadmin', 'admin', 'user']}>
            <NewListDevice />
          </ProtectedRoutes>
        } />

        <Route path="/settings" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <Credentials />
          </ProtectedRoutes>
        } />

        <Route path="/settings/processes/:id" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <ProcessDetail />
          </ProtectedRoutes>
        } />

        <Route path="/settings/processes" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <Processes />
          </ProtectedRoutes>
        } />

        <Route path="/settings/machines" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <Machines />
          </ProtectedRoutes>
        } />


        <Route path="/settings/operators" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <Operators />
          </ProtectedRoutes>
        } />


        <Route path="/settings/devices" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <NewListDevice />
          </ProtectedRoutes>
        } />

        <Route path="/settings/datasets" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <Datasets />
          </ProtectedRoutes>
        } />

        <Route path="/settings/trained-models" element={
          <ProtectedRoutes roles={['superadmin', 'admin']}>
            <TrainedModels />
          </ProtectedRoutes>
        } />

        <Route path="/signin" element={<Signin />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
