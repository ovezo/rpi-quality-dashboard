import React from 'react';
import PropTypes from 'prop-types';
import { Add } from '@mui/icons-material';

const EmptyTableAddData = ({ title, description, onClick }) => {
  
  return (
    <div className="py-12 px-5 rounded-xl bg-white dark:bg-slate-800 shadow-sm duration-150 ease-in-out text-center">
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 bg-opacity-20 hover:bg-opacity-30 cursor-pointer" onClick={onClick}>
          <Add className='!text-green-500'/>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-black dark:text-white mb-1">{title}</h2>
      <p className="text-xs">{description}</p>
    </div>
  );
};

EmptyTableAddData.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EmptyTableAddData;