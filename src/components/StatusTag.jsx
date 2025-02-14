import React from 'react';
import PropTypes from 'prop-types';

const StatusTag = ({ text, status }) => {
  const baseClasses = 'bg-opacity-20 px-2 py-1 rounded-lg text-xs font-bold border';
  
  const statusClasses = {
    danger: 'bg-red-500 text-red-500 border-red-500',
    warning: 'bg-yellow-300 text-yellow-300 border-yellow-300',
    success: 'bg-green-500 text-green-500 border-green-500',
    default: 'bg-gray-500 text-gray-500 border-gray-500',
  };

  const colorClass = status ? statusClasses[status] : statusClasses.default;

  if (!text || !status){
    return
  }

  return (
    <span className={`${baseClasses} ${colorClass}`}>
      {text}
    </span>
  );
};

StatusTag.propTypes = {
  text: PropTypes.any,
  status: PropTypes.oneOf(['danger', 'warning', 'success'])
};

export default StatusTag;