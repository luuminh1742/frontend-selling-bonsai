import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"

const Map = () => {
    return (
        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 20.024641129074624, lng: 105.59102553938223 }}
            >
            </GoogleMap>
        </div>
    );
}

export default withScriptjs(withGoogleMap(Map))