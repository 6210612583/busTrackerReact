import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MapContainer from "../mapComponents/MapContainer";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px"
};
const center = {
  lat: 40.712776,
  lng: -74.005974
};
const options = {
  disableDefaultUI: true,
  zoomControl: true
};

function Map() {
  

  return (
    <div>
      <MapContainer>

      </MapContainer>
    </div>
  );
}

export default Map;
