import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

import Logo from '../images/logo.png';
import Icon from '../images/icon.png';
import { api } from "../store/api/index";
import { useAuth } from '../context/AuthContext';
import ReportingIcon from './svgComponents/ReportingIcon';
import MonitoringIcon from './svgComponents/MonitoringIcon';
import CycleIcon from './svgComponents/CycleIcon';
import VideoIcon from './svgComponents/VideoIcon';
import { useDevices } from '../hooks/useDevices';
import AnnotationIcon from './svgComponents/AnnotationIcon';
import SettingsIcon from './svgComponents/SettingsIcon';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const { user } = useAuth()

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  const { devices } = useDevices();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img 
              src={sidebarExpanded ? Logo : Icon} 
              alt="RoboMinder Logo" 
              className={`transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`} 
            />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Menus</span>
            </h3>
            <ul className="mt-3">
              {/* Devices */}
              <SidebarLinkGroup
                activecondition={pathname === '/devices'}
                title={'Device Setup'}
                link='/devices'
                Icon={MonitoringIcon}
                sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
              />
              
              {/* Real time alerting */}
              <SidebarLinkGroup
                activecondition={pathname.includes('/real-time-alerting')}
                title={'Real Time Alerting'}
                childItems={
                  devices.map(d => ({ name: d.name, link: "/real-time-alerting/" + d.mac_address }))
                }
                Icon={CycleIcon}
                sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
              />

              {/* Reporting */}
              <SidebarLinkGroup
                activecondition={pathname.includes('reporting')}
                title={'Reporting'}
                childItems={[
                  {
                    name: 'Analytics',
                    link: "/reporting/analytics"
                  }
                ]}
                Icon={ReportingIcon}
                sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
              />


              {/* Monitoring only Superadmin*/}
              {
                user?.role === 'superadmin'
                &&
                <SidebarLinkGroup
                  activecondition={pathname.includes('monitoring')}
                  title={'Monitoring'}
                  childItems={[
                    {
                      name: 'Devices',
                      link: "/monitoring/devices"
                    }
                  ]}
                  Icon={MonitoringIcon}
                  sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
                />
              }


              {/* Monitoring only Superadmin*/}
              {
                <SidebarLinkGroup
                  activecondition={pathname.includes('annotation')}
                  title={'Annotation'}
                  childItems={[
                    {
                      name: 'Dataset',
                      link: "/annotation/annotate"
                    }
                  ]}
                  Icon={AnnotationIcon}
                  sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
                />
              }
              {/* Quality control*/}
              <SidebarLinkGroup
                activecondition={pathname.includes('quality-control')}
                title={'Quality Control'}
                childItems={[
                  {
                    name: 'Training',
                    link: "/quality-control/training"
                  },
                  {
                    name: 'Predict - image',
                    link: "/quality-control/predict"
                  }
                ]}
                Icon={VideoIcon}
                sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
              />

              {/* Settings control*/}
              <SidebarLinkGroup
                activecondition={pathname.includes('/settings')}
                title={'Settings'}
                childItems={[
                  {
                    name: 'Processes',
                    link: "/settings/processes"
                  },
                  {
                    name: 'Machines',
                    link: "/settings/machines"
                  },
                  {
                    name: 'Operators',
                    link: "/settings/operators"
                  },
                  {
                    name: 'RoboMinder Devices',
                    link: "/settings/devices"
                  },
                  {
                    name: 'Datasets',
                    link: "/settings/datasets"
                  },
                  {
                    name: 'Trained AI Models',
                    link: "/settings/trained-models"
                  }
                ]}
                Icon={SettingsIcon}
                sidebarExpanded={(is_expanded) => setSidebarExpanded(is_expanded)}
              />

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;