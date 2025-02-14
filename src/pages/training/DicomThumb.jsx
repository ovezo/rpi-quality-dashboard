import React, { useEffect } from 'react'
import { App, AppOptions, ViewConfig } from 'dwv'

const UncontrollableDwv = ({src}) => {
  var app;  
  useEffect(()=>{
    if (app)
      return
    // create the dwv app
    app = new App();
    // initialise
    const viewConfig0 = new ViewConfig(src+"_prev");
    const viewConfigs = {'*': [viewConfig0]};
    const options = new AppOptions(viewConfigs);
    app.init(options);
    // load dicom data
    app.loadURLs([
      src
    ]);
  }, [])

  return (
    <div id={src+"_prev"} className="layerGroup">
      <div id="dropBox"></div>
    </div>
  )
}

export default UncontrollableDwv