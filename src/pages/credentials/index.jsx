import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AuthImage from '../../images/applications-image-15.jpg';
import AuthDecoration from '../../images/auth-decoration.png';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import CompanyBg from '../../images/company-bg.jpg';
import CompanyImage from '../../images/icon.png';

function Credentials() {

  const { saveCredentials, user } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [credentials, setCredentials] = useState({ 
    ssid: user.ssid || '',
    wifiPassword: user.wifiPassword || '', 
    trackingItem: user.trackingItem || ''
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    saveCredentials(credentials.ssid, credentials.wifiPassword, credentials.trackingItem).then( _ => {
      return setSuccess("Credentials updated successfully!")
    }).catch((error) => {
      console.error(error)
      setError("Something wrong, please try again later.")
    });
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          {/* Profile background */}
          <div className="h-56 bg-slate-200 dark:bg-slate-900">
            <img className="object-cover h-full w-full" src={CompanyBg} width="2560" height="440" alt="Company background" />
          </div>

          {/* Header */}
          <header className="text-center bg-slate-50 dark:bg-slate-800/20 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl mx-auto">
                {/* Avatar */}
                <div className="-mt-12 mb-2">
                  <div className="inline-flex -ml-1 -mt-1 sm:mb-0">
                    <img className="rounded-full border-4 border-white dark:border-slate-900 bg-white" src={CompanyImage} width="104" height="104" alt="Avatar" />
                  </div>
                </div>

                <div className="max-w-sm mx-auto w-full px-4 py-8 text-left mb-2">
                  Wi-Fi credentials:
                  <br />
                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="ssid">WiFi SSID</label>
                        <input
                          id="ssid"
                          className="form-input w-full"
                          required
                          value={credentials.ssid}
                          onChange={e => setCredentials({ ...credentials, ssid: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="wifiPassword">WiFi Passphrase</label>
                        <input
                          id="wifiPassword"
                          className="form-input w-full"
                          type='password'
                          required
                          autoComplete="on"
                          value={credentials.wifiPassword}
                          onChange={e => setCredentials({ ...credentials, wifiPassword: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="trackingItem">Item to be tracked</label>
                        <input
                          id="trackingItem"
                          className="form-input w-full"
                          required
                          placeholder='ex: box'
                          value={credentials.trackingItem}
                          onChange={e => setCredentials({ ...credentials, trackingItem: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {
                      error
                      &&
                      <div className="mt-5">
                        <div className="bg-red-100 dark:bg-red-400/30 text-red-600 dark:text-red-400 px-3 py-2 rounded">
                          <span className="text-sm">
                            {error}
                          </span>
                        </div>
                      </div>
                    }

                    {/* Success */}
                    {
                      success
                      &&
                      <div className="mt-5">
                        <div className="bg-green-100 dark:bg-green-400/30 text-green-600 dark:text-green-400 px-3 py-2 rounded">
                          <span className="text-sm">
                            {success}
                          </span>
                        </div>
                      </div>
                    }

                    <div className="flex items-center justify-between mt-6">
                      <div className="mr-1">
                      </div>
                      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" type='submit'>Submit</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
}

export default Credentials;