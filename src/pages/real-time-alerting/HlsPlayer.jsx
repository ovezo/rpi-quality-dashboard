import React, { useEffect, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const HlsPlayer = ({ hlsUrl }) => {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   if (Hls.isSupported()) {
  //     const hls = new Hls();
  //     hls.loadSource(hlsUrl);
  //     hls.attachMedia(videoRef.current);
  //   } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
  //     videoRef.current.src = hlsUrl;
  //   }
  // }, [hlsUrl]);

  return (
    <ReactHlsPlayer
      src={hlsUrl}
      autoPlay={true}
      controls={true}
      muted
      hlsConfig={{
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        lowLatencyMode: true
      }}
      width="100%"
      style={{height: "100%"}}
    />
  );
};

export default HlsPlayer;
