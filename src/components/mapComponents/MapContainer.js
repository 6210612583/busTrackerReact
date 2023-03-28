import React, { useState, useContext, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import UserLocaterMarker from "./UserLocaterMarker";
import { MapContext } from "@react-google-maps/api";
import BusStopLocaterMarker from "./BusStopLocaterMarker";
import BusLocaterMarker from "./BusLocaterMarker";
import NearestBusStopMarker from "./NearestBusStopMarker";

const mapContainerStyle = {
    width: "100%",
    height: "100vh",

};
const center = { lat: 14.071780, lng: 100.606732 }
const TU_BONDS = {

    north: 14.088540,
    south: 14.054454,
    west: 100.590749,
    east: 100.618673,

};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    restriction: {
        latLngBounds: TU_BONDS,
        strictBounds: false,
    },
    styles: [{
        "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "on" },]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            { "visibility": "on" }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            { "visibility": "off" }
        ],
        /* "stylers": [ //this will display or dorm and hotel
            {
              "visibility": "on",
              "featureType": "poi.business",
              "poi.business": "dorm"
            }
          ] */
    },
    ]
};

/* const MapContext = React.createContext(null); */

function MapContainer() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyA_24K0W7o4uGh-mtt7FP63AwvdAIRK4GI",
        /* libraries */
    });

    const [map, setMap] = useState(null);

    const [passengerLocater, setPassengerLocater] = useState({});

    const [selectedRoute, setSelectedRoute] = useState();
    const [nearestBusStop, setNearestBusStop] = useState({})

    const [busStopsList, setBusStopsList] = useState([]);
    const [busStopLocater, setBusStopLocater] = useState([])


    const onMapLoad = (map) => {

        setMap(map);
    };

    useEffect(() => {
    }, [map]);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <div>
            <MapContext.Provider value={map}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={16}
                    onLoad={onMapLoad}
                    options={options}
                    onError={(e) => console.error("Error loading map", e)}
                >
                    <UserLocaterMarker passengerLocater={passengerLocater} setPassengerLocater={setPassengerLocater} />

                    <BusLocaterMarker />
                    <BusStopLocaterMarker busStopLocater={busStopLocater} setBusStopLocater={setBusStopLocater} />
                    <NearestBusStopMarker busStopLocater={busStopLocater} setBusStopLocater={setBusStopLocater} />

                    {console.log(busStopLocater)}
                </GoogleMap>
            </MapContext.Provider>

        </div>
    );
}

export default MapContainer;
