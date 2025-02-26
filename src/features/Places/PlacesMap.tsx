"use client";

import { useEffect, useRef, useState } from "react";
import {
  Column,
  Input,
  LinearProgress,
  GeoMap,
  Phrase,
  Row,
  Select,
  useProgress,
} from "@/components";

import { classNames, maybePluralize } from "@/utils";

import { NameValueObject } from "@/types";
import { PlaceCard } from "./PlaceCard/PlaceCard";
import { PROGRESS_BAR_WIDTH } from "./constants";
import { GoogleMapRef } from "@/components/Map/Map";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/Button/Button";
import { sendToMixpanel } from "@/lib/mixpanel";
import { PlaceSlideCard } from "./PlaceCard/PlaceSlideCard";
import { CATEGORIES, LONDON_COORDINATES } from "@/constants";
import { useNotifications, useSearchPlaces } from "@/hooks";
import { Dictionary } from "@/dictionaries";
import ShareLocationLink from "../ShareLocationLink/ShareLocationLink";
import { ObjectId } from "mongodb";

type Location = google.maps.LatLngLiteral | undefined;
type Prediction = google.maps.places.AutocompletePrediction;
type AutocompleteService = google.maps.places.AutocompleteService | null;
type AutocompleteToken = google.maps.places.AutocompleteSessionToken | null;

export const PlacesMap = () => {
  const { dict, lang } = useLanguage();

  const categoryOptions: Array<NameValueObject<string>> = CATEGORIES.reduce(
    (options, category) => [
      ...options,
      {
        name: dict[category as keyof Dictionary],
        value: category,
      },
    ],
    [{ name: dict["All categories"], value: "all" }]
  );

  const DISTANCE: Array<NameValueObject<number>> = [
    1000, 2000, 5000, 10000, 25000, 100000,
  ].map((value) => ({ name: `${value / 1000}${dict["km"]}`, value }));

  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState<string>(categoryOptions[0].value);
  const [distance, setDistance] = useState(DISTANCE[DISTANCE.length - 1].value);

  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  const [selectedPlaceId, setSelectedPlaceId] = useState<ObjectId | null>(null);
  const [location, setLocation] = useState<Location>(LONDON_COORDINATES);
  const [predictions, setPredictions] = useState<Array<Prediction>>([]);

  const mapRef = useRef<GoogleMapRef | null>(null);
  const serviceRef = useRef<AutocompleteService>(null);
  const sessionTokenRef = useRef<AutocompleteToken>(null);

  const { finishProgress, progress, showProgress, startProgress } =
    useProgress(PROGRESS_BAR_WIDTH);

  const { showError } = useNotifications();

  const {
    isLoading: isLoadingPlaces,
    data,
    totalPlacesCount,
  } = useSearchPlaces({
    location,
    category,
    distance,
  });

  const handleFocus = () => {
    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        new google.maps.places.AutocompleteSessionToken();
    }
  };

  const fetchPlaceDetails = (placeId: string) => {
    const mapInstance = mapRef.current?.getMap();
    if (!mapInstance) {
      setPredictions([]);
      throw new Error("Map is not available yet. Please wait until it loads");
    }

    const service = new google.maps.places.PlacesService(mapInstance);

    return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      service.getDetails(
        {
          placeId,
          fields: ["geometry"],
          sessionToken: sessionTokenRef.current ?? undefined,
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place);
          } else {
            reject(status);
          }
        }
      );
    });
  };

  const onSelectPrediction = async ({ value }: NameValueObject<string>) => {
    setPredictions([]);

    try {
      const { geometry } = await fetchPlaceDetails(value);
      const { lat, lng } = geometry?.location ?? {};
      sendToMixpanel("changed_location", { location: value, lat, lng });

      if (lat && lng) {
        setLocation({ lat: lat(), lng: lng() });
      }
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else if (error === "OVER_QUERY_LIMIT") {
        showError(
          dict[
            "You've made too many searches in a short time. Please wait a minute and try again."
          ],
          { header: dict["Whoa, slow down!"] }
        );
      } else {
        showError("Oops, try again");
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDistance(distance / 4);
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (_) => {
          showError(dict["We couldn’t find your location. Try searching!"], {
            header: dict["Location not found"],
          });
        }
      );
    } else {
      showError(dict["We couldn’t find your location. Try searching!"], {
        header: dict["Location not found"],
      });
    }
  };

  useEffect(() => {
    sendToMixpanel("page_view", { page: "Places Map" });
  }, []);

  useEffect(() => {
    if (mapIsLoaded && !isLoadingPlaces) {
      serviceRef.current = new google.maps.places.AutocompleteService();

      // Show progress for at least a second
      const timeout = setTimeout(finishProgress, 1000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      startProgress();
    }
  }, [mapIsLoaded, isLoadingPlaces, finishProgress, startProgress]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!serviceRef.current || !inputValue) {
        setPredictions([]);
        return;
      }

      if (inputValue.length > 2) {
        const request: google.maps.places.AutocompletionRequest = {
          input: inputValue,
          sessionToken: sessionTokenRef.current ?? undefined,
          componentRestrictions: { country: ["uk", "nl", "ge"] },
        };

        serviceRef.current.getPlacePredictions(request, (result, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            result?.length
          ) {
            setPredictions(result);
          } else {
            setPredictions([]);
          }
        });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const placeCards: Array<React.ReactNode> = [];
  let selectedCard: React.ReactNode = <></>;

  data.forEach((place) => {
    const card = (
      <PlaceCard
        onClick={() => {
          sendToMixpanel("selected_place_card", {
            id: place._id,
            name: place.name,
          });
          setSelectedPlaceId(place._id);
        }}
        key={place._id.toString()}
        selectedId={selectedPlaceId}
        place={place}
      />
    );

    if (place._id === selectedPlaceId) {
      selectedCard = (
        <PlaceSlideCard
          onClick={() => {
            sendToMixpanel("selected_place_card_mobile", {
              id: place._id,
              name: place.name,
            });
            setSelectedPlaceId(place._id);
          }}
          place={place}
        />
      );
    }

    placeCards.push(card);
  });

  return (
    <Column className="grow items-center w-full h-auto">
      <Column className="max-w-screen-xl w-full grow px-4 md:px-8 py-2 md:flex-row">
        <Column className="grow ">
          <Input
            disabled={showProgress}
            label={dict["Location"]}
            name="location"
            onFocus={handleFocus}
            withClearButton
            items={predictions.map(({ description, place_id }) => ({
              name: description,
              value: place_id,
            }))}
            onSelect={onSelectPrediction}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Column>
        <Row className="mt-2 md:mt-0 ">
          <Column className="ml-0 md:ml-2 mr-1 grow">
            <Select
              disabled={showProgress}
              name="category"
              items={categoryOptions}
              label={dict["Category"]}
              defaultValue={category}
              onChange={({ value }) => {
                sendToMixpanel("changed_category", { category: value });
                setCategory(value);
              }}
            />
          </Column>
          <Column className="ml-1 grow">
            <Select
              disabled={showProgress}
              name="distance"
              items={DISTANCE}
              label={dict["Distance"]}
              defaultValue={distance}
              onChange={({ value }) => {
                sendToMixpanel("changed_distance", { distance: value });
                setDistance(value);
              }}
            />
          </Column>
        </Row>
      </Column>
      <Row className="justify-between max-w-screen-xl w-full grow px-4 md:px-8 mb-2">
        <Row className="justify-between md:justify-normal items-center grow basis-0 flex-nowrap h-7">
          <Button
            icon="pin-solid"
            size="super-condensed"
            layout="filled"
            onClick={() => {
              getLocation();
              sendToMixpanel("find_me_clicked");
            }}
            label={dict["Find me"]}
          />
          <ShareLocationLink />
        </Row>
        {mapIsLoaded && !isLoadingPlaces ? (
          <Row
            className={classNames(
              "hidden sm:flex items-center grow basis-0 justify-end text-nowrap h-7",
              showProgress && "hidden"
            )}
          >
            {dict["Added"]}
            <strong className="ml-1 text-lg">
              {maybePluralize(totalPlacesCount, dict["place"], lang)}
            </strong>
          </Row>
        ) : null}
      </Row>

      {showProgress && (
        <Row
          className="m-auto h-full mb-10"
          style={{ width: `${PROGRESS_BAR_WIDTH}px` }}
        >
          <Column className="grow justify-center">
            <LinearProgress value={progress * 100} />
          </Column>
        </Row>
      )}

      <Row className={classNames("w-full h-full", showProgress && "hidden")}>
        {data.length ? (
          <Column className="hidden lg:flex w-[50vw] overflow-y-scroll h-[calc(100vh-230px)] px-3 -mt-[2px]">
            {placeCards}
          </Column>
        ) : null}
        <Column
          onClick={() => setSelectedPlaceId(null)}
          className={data.length ? "w-screen lg:w-[50vw] " : "w-full"}
        >
          <GeoMap
            ref={mapRef}
            onLoadedAction={setMapIsLoaded}
            onPlaceSelectedAction={(id) => {
              setSelectedPlaceId(id);

              setTimeout(() => {
                document.getElementById(String(id))?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 200);
            }}
            selectedPlaceId={selectedPlaceId}
            zoom={14}
            distance={distance}
            location={location}
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
            googleMapsMapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? ""}
            locations={data}
          />
          <Row className="absolute ml-3 mt-3">
            <Phrase className="bg-primary-1000/70 px-3 py-1 text-sm rounded-md text-primary-0">
              {placeCards.length
                ? `${dict["Showing"]} ${maybePluralize(
                    placeCards.length,
                    dict["result"],
                    lang
                  )}`
                : dict["Nothing found"]}
            </Phrase>
          </Row>

          <Row
            className="grow bottom-0 absolute w-full box-border justify-center lg:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedCard}
          </Row>
        </Column>
      </Row>
    </Column>
  );
};
