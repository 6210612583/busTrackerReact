import { useContext, useEffect, useState } from "react"
import { MapContext, Marker } from "@react-google-maps/api"

const BusStopLocaterMarker = (props) => {
  const map = useContext(MapContext)
  const [token, setToken] = useState()
  const [busStopLocater, setBusStopLocater] = useState([])

  // Function to update the position of a marker
const updateMarkerPosition = (bsid, newIcon) => {
    setBusStopLocater(prev => prev.map(stop => {
      if (stop.bsid === bsid) {
        return {
          ...stop,
          icon: newIcon
        };
      } else {
        return stop;
      }
    }));
  };

  const createBusStopMarkers = (bsList) => {
    const icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    return bsList.map(stop => {
      return (
        <Marker
          position={{ lat: stop.coordinate[0], lng: stop.coordinate[1] }}
          key={stop.bsid}
          icon={icon}
        ></Marker>
      )
    });

    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenData = await fetchBustrackerToken();
        setToken(tokenData);
        const busStopData = await fetchStopBusLocater(tokenData);
        setBusStopLocater(busStopData.data.listBusStops.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
   
  }, [])

  return (
    <>
      {createBusStopMarkers(busStopLocater)}
    </>
  )
}

export default BusStopLocaterMarker;

async function fetchBustrackerToken() {
  const response = await fetch('http://supersonixz-env.eba-bxfxd6c3.ap-southeast-1.elasticbeanstalk.com/session', {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const tokenData = await response.text();
  //console.log(tokenData);
  return tokenData;
}

async function fetchStopBusLocater(token) {
  if (!token) {
    throw new Error("Token is undefined");
  }
  const body = { token: token, password: 'aaa' }
  const queryParams = new URLSearchParams(body);

  const response = await fetch('http://supersonixz-env.eba-bxfxd6c3.ap-southeast-1.elasticbeanstalk.com/listAllBusStops?' + queryParams.toString(), {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const busStopData = await response.json();
  //console.log(busStopData.data.listBusStops.items);
  return busStopData;
}
