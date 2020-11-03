import React from "react";
import { Map, GeoJSON } from "react-leaflet";
import countries from "../../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";

const LeafletMap = () => {
  const contryStyle = {
    fillColor: "green",
    fillOpacity: 0.4,
    color: "black",
    weight: 0.5,
    // dashArray: 2,
  };

  const onEachCountry = (feature, layer) => {
    console.log("feature / country", feature.properties.ADMIN);
    // Layer is a poly shape that is drawn on the screen
    console.log("layer", layer);

    const countryName = feature.properties.ADMIN;
    // we get a build methods for things like pop-up
    // layer.bindPopup(countryName);
    layer.on({
      click: (event) => {
        console.log("Click on " + countryName);
        event.target.setStyle({
          fillColor: "red",
          fillOpacity: 1,
        });
      },
      mouseover: (event) => {
        event.target.setStyle({
          fillOpacity: 0.8,
        });
      },
    });
  };

  console.log(countries);
  return (
    <Map style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
      {/* Setting properties on geojson style */}
      <GeoJSON
        style={contryStyle}
        data={countries.features}
        onEachFeature={onEachCountry}
      />
      <GeoJSON
        style={contryStyle}
        data={countries.features}
        onEachFeature={onEachCountry}
      />
    </Map>
  );
};

export default LeafletMap;
