import React, { useEffect, useState } from 'react';
import HlsPlayer from './HlsPlayer';
import { api } from '../../store/api';

const Stream = () => {
  const [hlsUrl, setHlsUrl] = useState('');

  const startStream = async () => {
    const rtspUrl = "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"; // Get the RTSP URL dynamically

    const response = await api.get({url: `http://localhost:8000/stream?rtsp_url=${encodeURIComponent(rtspUrl)}`})
    setHlsUrl('http://localhost:8000' + response.data.hls_url);  // HLS URL from FastAPI
  };

  useEffect(()=>{
    startStream()
  }, [])

  return (
    hlsUrl 
    ? <HlsPlayer hlsUrl={hlsUrl} />
    : <h1>No video</h1>
  );
};

export default Stream;
