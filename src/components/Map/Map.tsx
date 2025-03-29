"use client";

import { GoogleMap, Libraries, useJsApiLoader } from "@react-google-maps/api";
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { sendToMixpanel } from "@/lib/mixpanel";
import { GetPublicLocationsQuery } from "@/types";

import { Row } from "../Row/Row";
import { createDashedCirclePolyline } from "./utils";

interface MapProps {
  distance: number;
  googleMapsApiKey: string;
  googleMapsMapId: string;
  location: google.maps.LatLngLiteral | undefined;
  locations: GetPublicLocationsQuery["ukrainian_locations"];
  mapContainerStyle?: React.CSSProperties;
  onLoadedAction: (isLoaded: boolean) => void;
  onPlaceSelectedAction: (id: number) => void;
  selectedPlaceId: number | null;
  showMe?: boolean;
  zoom: number;
}

export interface GoogleMapRef {
  getMap: () => google.maps.Map | null;
}

type AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
type GoogleMapInstance = google.maps.Map;
type Polyline = google.maps.Polyline;

const OPTIONS = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
};
const libraries: Libraries = ["marker", "places"];

const MapComponent = (
  {
    distance,
    googleMapsApiKey,
    googleMapsMapId,
    location,
    locations,
    mapContainerStyle = { height: "100%", width: "100%" },
    onLoadedAction,
    onPlaceSelectedAction,
    selectedPlaceId,
    showMe,
    zoom,
  }: MapProps,
  ref: ForwardedRef<GoogleMapRef>
) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const mapRef = useRef<GoogleMapInstance | null>(null);
  const dashedCircleRef = useRef<Polyline | null>(null);

  const markersRef = useRef<Map<number, AdvancedMarkerElement>>(new Map());
  const labelSpansRef = useRef<Map<number, HTMLSpanElement>>(new Map());

  const onLoad = useCallback((map: GoogleMapInstance) => {
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

    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current.clear();
    labelSpansRef.current.clear();

    locations.forEach(({ geo, id, name }) => {
      const contentDiv = document.createElement("div");
      contentDiv.style.cursor = "pointer";

      const words = name.split(" ");
      const maxNumWords = 3;
      const textContent =
        words.length > maxNumWords
          ? `${words.slice(0, maxNumWords).join(" ")}...`
          : name;

      const labelSpan = document.createElement("span");
      labelSpan.setAttribute("id", String(id));
      labelSpan.style.borderRadius = "30px";
      labelSpan.style.color = "white";
      labelSpan.style.fontFamily = "arsenal";
      labelSpan.style.position = "relative";
      labelSpan.style.whiteSpace = "nowrap";
      labelSpan.style.padding = "4px 8px";
      labelSpan.innerHTML = textContent;

      const arrowDiv = document.createElement("div");
      arrowDiv.style.borderLeft = "4px solid transparent";
      arrowDiv.style.borderRight = "4px solid transparent";
      arrowDiv.style.bottom = "-3px";
      arrowDiv.style.height = "0";
      arrowDiv.style.left = "50%";
      arrowDiv.style.position = "absolute";
      arrowDiv.style.transform = "translateX(-50%)";
      arrowDiv.style.width = "0";

      if (id === selectedPlaceId) {
        labelSpan.style.backgroundColor = "#007BFF";
        arrowDiv.style.borderTop = "4px solid #007BFF";
      } else {
        labelSpan.style.backgroundColor = "#444444";
        arrowDiv.style.borderTop = "4px solid #444444";
      }

      labelSpan.appendChild(arrowDiv);
      contentDiv.appendChild(labelSpan);

      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        content: contentDiv,
        map,
        position: {
          lat: geo.coordinates[1],
          lng: geo.coordinates[0],
        },
        title: name,
      });

      advancedMarker.addListener("click", () => {
        sendToMixpanel("selected_place_marker", {
          id: id,
          name,
        });
        onPlaceSelectedAction(id);
      });

      labelSpan.onmouseover = () => {
        if (id !== selectedPlaceId) {
          labelSpan.style.backgroundColor = "#000000";
          arrowDiv.style.borderTop = "4px solid #000000";
          advancedMarker.element.classList.add("selected");
        }
      };

      labelSpan.onmouseout = () => {
        if (id !== selectedPlaceId) {
          advancedMarker.element.classList.remove("selected");

          advancedMarker.element.classList.add("advanced-marker");
          labelSpan.style.backgroundColor = "#444444";
          arrowDiv.style.borderTop = "4px solid #444444";
        }
      };

      markersRef.current.set(id, advancedMarker);
      labelSpansRef.current.set(id, labelSpan);
    });
  }, [isLoaded, locations, onPlaceSelectedAction, selectedPlaceId]);

  // useEffect(() => {
  //   labelSpansRef.current.forEach((labelSpan, id) => {
  //     const arrowDiv = labelSpan.lastElementChild as HTMLDivElement;

  //     if (id === selectedPlaceId) {
  //       labelSpan.style.backgroundColor = "#007BFF";
  //       arrowDiv.style.borderTop = "4px solid #007BFF";
  //     } else {
  //       labelSpan.style.backgroundColor = "#444444";
  //       arrowDiv.style.borderTop = "4px solid #444444";
  //     }
  //   });
  // }, [selectedPlaceId]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      if (!marker.element) return;

      marker.element.classList.remove("selected");
      marker.element.classList.add("advanced-marker");

      if (id === selectedPlaceId) {
        marker.element.classList.add("selected");
      }
    });
  }, [selectedPlaceId]);

  useEffect(() => {
    if (!isLoaded) return;
    setTimeout(drawDashedCircle, 500);
  }, [isLoaded, location, distance, drawDashedCircle]);

  useEffect(() => {
    if (!mapRef.current || !location || !showMe) return;

    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: location,
      zIndex: 10,
    });

    return () => {
      if (advancedMarker) {
        advancedMarker.map = null;
      }
    };
  }, [location, showMe]);

  const options = useMemo(
    () => ({ ...OPTIONS, mapId: googleMapsMapId }),
    [googleMapsMapId]
  );

  if (!isLoaded) {
    return (
      <Row className="h-full w-full items-center justify-center">
        Loading map...
      </Row>
    );
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      center={location}
      zoom={zoom}
      options={options}
      mapContainerStyle={mapContainerStyle}
    />
  );
};

export const GeoMap = forwardRef(MapComponent);
