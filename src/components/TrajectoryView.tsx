import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonToolbar } from "@ionic/react";
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
  trajectory?: ISavedTrajectory,
  actionButtonEnabled?: boolean,
  denomination?: string,
  mapHeight?: number,
  actionButtonText?: string,
  highlight?: boolean,
  sequence?: number,
  showSequence?: boolean,
  onActionButtonClicked?: (trajectory: ISavedTrajectory) => void
}

const defaultProps: ITrajectoryViewProps = {
  trajectory: {
    label: "empty trajectory",
    edited: false,
    waypoints: []
  },
  mapHeight: 300,
  actionButtonEnabled: false,
  denomination: "alternative",
  actionButtonText: "Select",
  highlight: false,
  onActionButtonClicked: () => null
}

const TrajectoryView: React.FC<ITrajectoryViewProps> = (props) => {

  const defaultCoords = {
    lat: props.trajectory?.waypoints.length !== 0 ? props.trajectory?.waypoints[0].position.latitude : 52.316374,
    lng: props.trajectory?.waypoints.length !== 0 ? props.trajectory?.waypoints[0].position.longitude : 10.558577
  } as Coords;

  const getCenterCoordinates = (): Coords => {
    const coord = props.trajectory!.waypoints[0].position;
    return {
      lat: coord.latitude,
      lng: coord.longitude
    }
  }

  const getGoogleMapsWaypoints = () => {
    return props.trajectory!.waypoints.map((wp) => ({
      lat: wp.position.latitude,
      lng: wp.position.longitude
    }))
  }

  const onTrajectoryActionButtonClicked = () =>
    props.onActionButtonClicked ? props.onActionButtonClicked(props.trajectory!) : null;

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
        <IonCardTitle color={props.highlight ? "secondary" : ""}>
          {props.trajectory!.label}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {
          props.trajectory?.waypoints.length === 0 ? <IonText>Empty</IonText> :
            <div style={{ height: `${props.mapHeight}px`, width: "100%" }}>
              <GoogleMapReact
              yesIWantToUseGoogleMapApiInternals={true}
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
                  props.trajectory!.waypoints.forEach((tr, i) => {
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
        }
        {props.actionButtonEnabled ? (
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={onTrajectoryActionButtonClicked}>{props.actionButtonText}</IonButton>
            </IonButtons>
          </IonToolbar>
        ) : null}
      </IonCardContent>
    </IonCard>
  )
};

TrajectoryView.defaultProps = defaultProps;

export default TrajectoryView;