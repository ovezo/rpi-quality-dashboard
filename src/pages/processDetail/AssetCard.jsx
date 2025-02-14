import React from 'react';

function AssetCard({ image, title, subtitle }) {
  
  return (
    <div className="py-5 px-5 rounded-xl bg-white dark:bg-slate-800 shadow-sm duration-150 ease-in-out">
      <img src={image} alt={title} className="w-32 h-32 object-cover rounded-full mb-4 mx-auto bg-slate-200 dark:bg-slate-700" />
      <h3 className="font-bold text-xl mt-6">{title}</h3>
      <div className="text-gray-400 text-sm">{subtitle}</div>
    </div>
  );
}

export default AssetCard;