const NearestBusStopMarker = (props) => {
    const map = useContext(MapContext)
    const [token, setToken] = useState()




    // Function to update the position of a marker
    const updateMarkerPosition = (bsid, newIcon) => {
        props.setBusStopLocater(prev => prev.map(stop => {
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

    return (
        <></>
    )
}

export default NearestBusStopMarker

const findNearestBusStop = () => {
    let nearestBusStop = props.stateData.selectedBusRoute.nearestBusStop
    console.log("findNearestBisStop passengerLocation: ", userLocation)
    busStopLists.forEach((stop) => {
        if (nearestBusStop.interval == null || (routeDistance({ lat: userLocation.lat, lng: userLocation.lng }, { lng: stop.coordinate[1], lng: stop.coordinate[0] }) < nearestBusStop.interval)) {
            nearestBusStop.bsid = stop.bsid
            nearestBusStop.title = stop.title
            nearestBusStop.interval = routeDistance({ lat: userLocation.lat, lng: userLocation.lng }, { lng: stop.coordinate[1], lng: stop.coordinate[0] })
            nearestBusStop.location = { lat: stop.coordinate[1], lng: stop.coordinate[0] }
        }
    })
    console.log("neareset busstop")
    console.log(nearestBusStop)
}

const getDirectionDistance = (start, end) => {
    const startPoint = new window.google.maps.LatLng(start.lat, start.lng);
    const endPoint = new window.google.maps.LatLng(end.lat, end.lng);

    const directionsService = new window.google.maps.DirectionsService();

    // Define the request parameters
    const request = {
        origin: startPoint,
        destination: endPoint,
        travelMode: window.google.maps.TravelMode.DRIVING
    };

    // Call the DirectionsService to get the route
    directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
            // Get the distance in the desired direction
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                startPoint,
                new window.google.maps.LatLng(
                    startPoint.lat() + 0.1, // Change the latitude in the desired direction
                    startPoint.lng() // Keep the longitude the same
                )
            );

            console.log(`The distance in the north direction is ${distance} meters`);
            return distance
        } else {
            console.error(`Error: ${status}`);
            return null
        }
    });
}