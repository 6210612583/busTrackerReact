import React, { useEffect, useContext } from "react";
import { Marker } from "@react-google-maps/api";
import { MapContext } from "@react-google-maps/api";

function UserLocaterMarker(props) {
  const map = useContext(MapContext);

  const getPassengerLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newMarker = new window.google.maps.Marker({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          map,
        });
        props.setPassengerLocater({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
      });

    }
  };

  useEffect(() => {
    if (map) {
      getPassengerLocation();
      
    }
  }, [map]);

  return null
}

export default UserLocaterMarker;
