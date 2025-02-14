import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DropdownClassic from '../../components/DropdownClassic';
import { useDevices } from '../../hooks/useDevices';
import DateTimePickerRange from '../../components/DateTimeRangePicker';
import { convertToLocalTimezone } from '../../utils/Utils';
import ClassesSection from './ClassesSection';
import AnnotationSection from './AnnotationSection';
import { ClassesProvider } from './useClasses';

function Annotation() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  return (
    <ClassesProvider>
      <div className="flex h-[100dvh] overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              {/* Dashboard actions */}
              {/* <div className="sm:flex sm:justify-between sm:items-center mb-8">



              </div> */}
              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">

                <ClassesSection/>

                <AnnotationSection />


              </div>

            </div>
          </main>

        </div>

      </div>
    </ClassesProvider>
  );
}

export default Annotation;