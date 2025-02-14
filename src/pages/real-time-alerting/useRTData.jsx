import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useParams } from "react-router-dom";
import { socket } from '../../utils/Utils';

// Provides Real-Time data from socket connection
const useRTData = () => {
  
  const { mac_address } = useParams();
  
  const [counts, setCounts] = useState({ total:0, normal:0, A:0, B:0, C:0, D:0, E:0, F:0, unpacked_box:0 });
  const [device, setDevice] = useState({});
  const [liveFrame, setLiveFrame] = useState();
  const [videoData, setVideoData] = useState("")

  const detectionsCountUpdated = (data) => {
    console.log("DETECT: ", data)
    if (data["device"] == mac_address) {
      setCounts(data);

      if(data["frames"].length>0){
        setLiveFrame(data["frames"][0]);
      }
    }
  }

  const devicesUpdated = (data) => {
    setDevice(data.filter((e, i) => e.name == mac_address)[0])
  }

  useEffect(() => {
    setLiveFrame()
    api.get({ url: `devices/${mac_address}` }).then((data, err) => {
      if (data.status == 200) {
        setDevice(data.data)
      }
    });

    api.get({ url: `detections/count?mac_address=${mac_address}` }).then((data, err) => {
      if (data.status == 200) {
        setCounts(data.data)
      }
    });

  }, [mac_address]);

  useEffect(()=>{
    if (!device)
      return

    let reconnectInterval; // Variable to hold the interval ID

    const connectSocket = () => {
      socket.connect();
      socket.on("video_frame", videoFrameReceived);
      socket.emit("join_stream", { mac_address: device.mac_address });

      socket.on("detections_count_updated", detectionsCountUpdated);
      socket.on("devices_updated", devicesUpdated);
    };

    const videoFrameReceived = (data) => {
      if (data.mac_address === device.mac_address || true) {
        const frame = data.frame_data;  
        // Decode the Base64-encoded string into binary data
        try {

          const blob = new Blob([frame], { type: 'image/jpeg' });
     
          // Log the blob to confirm the correct type and size
          console.log("Blob created:", blob);
     
          const url = URL.createObjectURL(blob)
     
          // Generate a URL for the Blob
          console.log("Generated URL:", url);

          // Update the state with the URL to display the image
          setVideoData({src: url, timestamp: data.timestamp});
        } catch (e) {
          console.error("Error processing the frame data:", e);
        }
      }
    };

    connectSocket(); // Initial connection

    // Set up reconnection every 3 seconds if disconnected
    reconnectInterval = setInterval(() => {
      if (!socket.connected && device) {
        console.log("Attempting to reconnect...");
        connectSocket();
      }
    }, 3000);

    return () => {
      clearInterval(reconnectInterval); // Clear the interval on cleanup
      socket.off("video_frame", videoFrameReceived);
    };
  }, [device])

  return { counts, device, liveFrame, setLiveFrame, videoData }

}

export default useRTData;