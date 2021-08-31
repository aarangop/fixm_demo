import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonToolbar } from "@ionic/react";
import { ISavedTrajectory } from "../features/defaultTrajectories";
import "./TrajectoryView.scss"
import "../theme/fonts.scss"
import { pencilOutline } from "ionicons/icons";
import GoogleMapReact, { Coords } from "google-map-react"
import gmApiKey from "../data/gmaps_api_key.json"
import { useState } from "react";
import googleMapReact from "google-map-react";
import { ITrajectoryPoint4D } from "../features/flightData";
import { pin } from "ionicons/icons";

interface ITrajectoryViewProps {
  trajectory: ISavedTrajectory,
  selectable?: boolean,
  denomination?: string,
  mapHeight?: number,
  onTrajectorySelected?: (trajectory: ISavedTrajectory) => void;
}

const defaultProps: ITrajectoryViewProps = {
  trajectory: {
    label: "empty trajectory",
    edited: false,
    waypoints: []
  },
  mapHeight: 300,
  selectable: false,
  denomination: "alternative",
  onTrajectorySelected: () => null
}

const TrajectoryView: React.FC<ITrajectoryViewProps> = (props) => {

  const defaultCoords = {
    lat: props.trajectory.waypoints[0].position.latitude,
    lng: props.trajectory.waypoints[0].position.longitude
  } as Coords;

  const getCenterCoordinates = (): Coords => {
    const coord = props.trajectory.waypoints[0].position;
    return {
      lat: coord.latitude,
      lng: coord.longitude
    }
  }

  const getGoogleMapsWaypoints = () => {
    return props.trajectory.waypoints.map((wp) => ({
      lat: wp.position.latitude,
      lng: wp.position.longitude
    }))
  }

  const onSelectAsPreferred = () => 
    props.onTrajectorySelected? props.onTrajectorySelected(props.trajectory) : null;

  const getInfoWindowContent = (waypoint: ITrajectoryPoint4D) => {
    return `<div>
      Position: ${waypoint.position.latitude}/${waypoint.position.longitude}<br/>
      Level: ${waypoint.level} <br/>
      Baro: ${waypoint.altimerterSetting} </br>
      Predicted Airspeed: ${waypoint.predictedAirspeed} </br>
      Predicted Groundspeed: ${waypoint.predictedGroundspeed} </br>
      Estimated Time: ${waypoint.absoluteTime}
      <div>`;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          {props.denomination}
        </IonCardSubtitle>
        <IonCardTitle>
          {props.trajectory.label}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div style={{ height: `${props.mapHeight}px`, width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: gmApiKey.key }}
            defaultCenter={getCenterCoordinates()}
            defaultZoom={8}
            onGoogleApiLoaded={({ map }) => {
              const flightPath = new google.maps.Polyline({
                path: getGoogleMapsWaypoints(),
                geodesic: true,
                strokeColor: "#eb445a"
              });
              flightPath.setMap(map);
              props.trajectory.waypoints.forEach((tr, i) => {
                const marker = new google.maps.Marker({
                  map,
                  position: {
                    lat: tr.position.latitude,
                    lng: tr.position.longitude
                  },
                  label: `WP ${i}`,
                  title: `${tr.position.latitude}/${tr.position.longitude}`
                });
                const infoWindow = new google.maps.InfoWindow();
                marker.addListener("click", () => {
                  infoWindow.close();
                  infoWindow.setContent(getInfoWindowContent(tr));
                  infoWindow.open(marker.getMap(), marker);
                });
              })
            }}
          >
          </GoogleMapReact>
        </div>
        {props.selectable ? (
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={onSelectAsPreferred}>Select as Preferred</IonButton>
            </IonButtons>
          </IonToolbar>
        ) : null}
      </IonCardContent>
    </IonCard>
  )
};

TrajectoryView.defaultProps = defaultProps;

export default TrajectoryView;