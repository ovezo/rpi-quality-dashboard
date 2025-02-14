import React from 'react';
import AssetCard from './AssetCard';
import machine from '../../images/machine.png'
import team from '../../images/team.png'
import EmptyTableAddData from '../../components/EmptyTableAddData';

function AssetsList() {
 
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Assets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AssetCard title={'CVP Impack'} subtitle={'BVYCS4XG22Z3SC9NW'} image={machine} />
        <AssetCard title={'CI Team'} subtitle={'Gary Jenkinson'} image={team} />
        <EmptyTableAddData title={"Machine"} description='Assign the robot' />
        <EmptyTableAddData title={"Operator"} description='Assign the operator unit' />
      </div>
    </div>
  );
}

export default AssetsList;