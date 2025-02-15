"use client";

import React, {
  useRef,
  useEffect,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { GoogleMap, Libraries, useJsApiLoader } from "@react-google-maps/api";
import { createDashedCirclePolyline } from "./utils";
import { PlaceData } from "@/types";
import { Row } from "../Row/Row";
import { sendToMixpanel } from "@/lib/mixpanel";

interface MapProps {
  zoom: number;
  onLoadedAction: (isLoaded: boolean) => void;
  selectedPlaceId: number | null;
  onPlaceSelectedAction: (id: number) => void;
  distance: number;
  location: google.maps.LatLngLiteral | undefined;
  locations: Array<PlaceData>;
  mapContainerStyle?: React.CSSProperties;
  googleMapsApiKey: string;
  googleMapsMapId: string;
}

export interface GoogleMapRef {
  getMap: () => google.maps.Map | null;
}

type AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
type Map = google.maps.Map;
type Polyline = google.maps.Polyline;

const OPTIONS = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};
const libraries: Libraries = ["marker", "places"];

const MapComponent = (
  {
    zoom,
    locations,
    location,
    onLoadedAction,
    selectedPlaceId,
    onPlaceSelectedAction,
    distance,
    mapContainerStyle = { width: "100%", height: "100%" },
    googleMapsApiKey,
    googleMapsMapId,
  }: MapProps,
  ref: ForwardedRef<GoogleMapRef>
) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const mapRef = useRef<Map | null>(null);
  const dashedCircleRef = useRef<Polyline | null>(null);
  const markersRef = useRef<Array<AdvancedMarkerElement>>([]);

  const onLoad = useCallback((map: Map) => {
    mapRef.current = map;
  }, []);

  const drawDashedCircle = useCallback(() => {
    if (!mapRef.current || !location || !distance) return;

    const map = mapRef.current;

    if (dashedCircleRef.current) {
      dashedCircleRef.current.setMap(null);
    }

    dashedCircleRef.current = createDashedCirclePolyline(
      map,
      location,
      distance
    );

    if (dashedCircleRef.current) {
      const path = dashedCircleRef.current.getPath();

      const bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }

      map.fitBounds(bounds, 50);
    }
  }, [distance, location]);

  useEffect(() => {
    if (isLoaded) {
      onLoadedAction(true);
    }
  }, [isLoaded, onLoadedAction]);

  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
  }));

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const map = mapRef.current;

    if (markersRef.current.length) {
      markersRef.current.forEach((marker) => (marker.map = null));
      markersRef.current = [];
    }

    locations.forEach(({ _id, name, geo }) => {
      const contentDiv = document.createElement("div");
      contentDiv.style.cursor = "pointer";

      const words = name.split(" ");
      const numWords = words.length;
      const maxNumWords = 3;

      const labelSpan = document.createElement("span");
      labelSpan.style.borderRadius = "5px";
      labelSpan.style.color = "white";
      labelSpan.style.fontFamily = "nunito";
      labelSpan.style.padding = "4px 8px";
      labelSpan.style.position = "relative";
      labelSpan.style.whiteSpace = "nowrap";
      labelSpan.textContent =
        numWords > maxNumWords
          ? `${words.splice(0, maxNumWords).join(" ")}...`
          : name;

      if (_id === selectedPlaceId) {
        labelSpan.style.backgroundColor = "#000000";
      } else {
        labelSpan.style.backgroundColor = "#444444";
      }

      labelSpan.onmouseover = () => {
        labelSpan.style.backgroundColor = "#000000";
        arrowDiv.style.borderTop = "4px solid #000000";
      };

      labelSpan.onmouseout = () => {
        if (_id !== selectedPlaceId) {
          labelSpan.style.backgroundColor = "#444444";
          arrowDiv.style.borderTop = "4px solid #444444";
        }
      };

      const arrowDiv = document.createElement("div");
      arrowDiv.style.borderLeft = "4px solid transparent";
      arrowDiv.style.borderRight = "4px solid transparent";
      arrowDiv.style.borderTop = "4px solid #444444";
      arrowDiv.style.bottom = "-4px";
      arrowDiv.style.height = "0";
      arrowDiv.style.left = "50%";
      arrowDiv.style.position = "absolute";
      arrowDiv.style.transform = "translateX(-50%)";
      arrowDiv.style.width = "0";

      labelSpan.appendChild(arrowDiv);
      contentDiv.appendChild(labelSpan);

      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: {
          lat: geo.coordinates[1],
          lng: geo.coordinates[0],
        },
        content: contentDiv,
        title: name,
      });

      advancedMarker.addListener("click", () => {
        sendToMixpanel("selected_place_marker", {
          id: _id,
          name,
        });
        onPlaceSelectedAction(_id);
      });

      markersRef.current.push(advancedMarker);
    });
  }, [isLoaded, locations, selectedPlaceId, onPlaceSelectedAction]);

  useEffect(() => {
    if (!isLoaded) return;

    setTimeout(drawDashedCircle, 500);
  }, [isLoaded, location, distance, drawDashedCircle]);

  useEffect(() => {
    if (!mapRef.current || !location) return;

    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: location,
    });

    return () => {
      if (advancedMarker) {
        advancedMarker.map = null;
      }
    };
  }, [location]);

  if (!isLoaded) {
    return (
      <Row className="h-full w-full justify-center items-center">
        Loading map...
      </Row>
    );
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      center={location}
      zoom={zoom}
      options={{ ...OPTIONS, mapId: googleMapsMapId }}
      mapContainerStyle={mapContainerStyle}
    />
  );
};

export const Map = forwardRef(MapComponent);
