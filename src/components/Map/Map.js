import React from "react";
import {
  YMaps,
  Map
} from "react-yandex-maps";
import st from "./map.module.css";

const MapWidget = (props) => {

  const mapData = {
    center: [props.coordinates.long, props.coordinates.lat],
    zoom: 7,
  };

  return (
    <YMaps className={st.rad}>
      <Map defaultState={mapData} className={st.layer}>
      </Map>
    </YMaps>
  )
};

export default MapWidget;
