"use client";

import { useEffect, useRef, useState } from "react";

import { Column, GeoMap, Input, Phrase, Row, Select } from "@/components";
import { Button } from "@/components/Button/Button";
import { GoogleMapRef } from "@/components/Map/Map";
import { LONDON_COORDINATES } from "@/constants";
import { Dictionary } from "@/dictionaries";
import { useLocations, useMediaQuery, useNotifications } from "@/hooks";
import { useLanguage } from "@/hooks/useLanguage";
import { sendToMixpanel } from "@/lib/mixpanel";
import { NameValueObject, Ukrainian_Location_Categories_Enum } from "@/types";
import { classNames, maybePluralize } from "@/utils";

import ShareLocationLink from "../ShareLocationLink/ShareLocationLink";
import { Loading } from "./Loading";
import { LocationCard } from "./LocationCard/LocationCard";
import { MobileLocationCard } from "./LocationCard/MobileLocationCard";

type Location = google.maps.LatLngLiteral | undefined;
type Prediction = google.maps.places.AutocompletePrediction;
type AutocompleteService = google.maps.places.AutocompleteService | null;
type AutocompleteToken = google.maps.places.AutocompleteSessionToken | null;

interface PlacesMapProps {
  slug?: string;
}

export const PlacesMap = ({ slug = "" }: PlacesMapProps) => {
  const { dict, lang } = useLanguage();

  const categoryOptions: Array<
    NameValueObject<Ukrainian_Location_Categories_Enum>
  > = Object.values(Ukrainian_Location_Categories_Enum).reduce(
    (options, category) => [
      ...options,
      {
        name: dict[
          category
            .toLowerCase()
            .replaceAll("_", " ") as unknown as keyof Dictionary
        ],
        value: category,
      },
    ],
    [
      {
        name: dict["All categories"],
        value: "" as Ukrainian_Location_Categories_Enum,
      },
    ]
  );

  const DISTANCE: Array<NameValueObject<number>> = [
    1000, 2000, 5000, 10000, 25000, 100000,
  ].map((value) => ({ name: `${value / 1000}${dict["km"]}`, value }));

  const [inputValue, setInputValue] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [showMe, setShowMe] = useState(false);
  const [placeSlug, setPlaceSlug] = useState(slug);
  const [category, setCategory] = useState<Ukrainian_Location_Categories_Enum>(
    categoryOptions[0].value
  );
  const [distance, setDistance] = useState(DISTANCE[DISTANCE.length - 1].value);

  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [location, setLocation] = useState<Location>(LONDON_COORDINATES);
  const [predictions, setPredictions] = useState<Array<Prediction>>([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const mapRef = useRef<GoogleMapRef | null>(null);
  const serviceRef = useRef<AutocompleteService>(null);
  const sessionTokenRef = useRef<AutocompleteToken>(null);

  const { showError } = useNotifications();
  const { usePublicLocations } = useLocations();

  const {
    data,
    loading: isLoadingPlaces,
    total,
  } = usePublicLocations({
    category,
    distance,
    geo: location,
    slug: placeSlug,
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
          fields: ["geometry"],
          placeId,
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

  const onSelectPrediction = async ({
    name,
    value,
  }: NameValueObject<string>) => {
    setPredictions([]);

    try {
      const { geometry } = await fetchPlaceDetails(value);
      const { lat, lng } = geometry?.location ?? {};
      sendToMixpanel("changed_location", { lat, lng, location: name });

      if (lat && lng) {
        setLocation({ lat: lat(), lng: lng() });
        setPlaceSlug("");
      }
      setShowMe(false);
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
          setShowMe(true);
        },
        (error) => {
          console.error(error);
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
    }
  }, [mapIsLoaded, isLoadingPlaces]);

  useEffect(() => {
    if (slug && data.length === 1 && data[0].slug === slug) {
      const location = data[0];
      setLocation({
        lat: location.geo.coordinates[1],
        lng: location.geo.coordinates[0],
      });
      setDistance(1000);
      setSelectedPlaceId(location.id);
    }
  }, [slug, data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!serviceRef.current || !inputValue) {
        setPredictions([]);
        return;
      }

      if (inputValue.length > 2) {
        const request: google.maps.places.AutocompletionRequest = {
          componentRestrictions: { country: ["uk", "nl", "ge"] },
          input: inputValue,
          sessionToken: sessionTokenRef.current ?? undefined,
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

  data.forEach((location) => {
    const card = (
      <LocationCard
        onClick={() => {
          sendToMixpanel("selected_place_card", {
            id: location.id,
            name: location.name,
          });
          setSelectedPlaceId(location.id);
        }}
        key={location.id.toString()}
        selectedId={selectedPlaceId}
        location={location}
      />
    );

    if (location.id === selectedPlaceId) {
      selectedCard = (
        <MobileLocationCard
          onClick={() => {
            sendToMixpanel("selected_place_card_mobile", {
              id: location.id,
              name: location.name,
            });
            setSelectedPlaceId(location.id);
          }}
          location={location}
        />
      );
    }

    placeCards.push(card);
  });

  return (
    <Column className="h-auto w-full grow items-center">
      <Column
        className={`
          w-full max-w-(--breakpoint-xl) grow px-4 py-2
          md:flex-row md:px-8
        `}
      >
        <Column className="grow">
          <Input
            disabled={!isReady}
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
        <Row
          className={`
            mt-2
            md:mt-0
          `}
        >
          <Column
            className={`
              mr-1 ml-0 grow
              md:ml-2
            `}
          >
            <Select
              disabled={!isReady}
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
              disabled={!isReady}
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
      <Row
        className={`
          mb-2 w-full max-w-(--breakpoint-xl) grow justify-between px-4
          md:px-8
        `}
      >
        <Row
          className={`
            h-7 grow basis-0 flex-nowrap items-center justify-between
            md:justify-normal
          `}
        >
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
              !isReady && "hidden"
            )}
          >
            {dict["Added"]}
            <strong className="ml-1 text-lg">
              {maybePluralize(total, dict["place"], lang)}
            </strong>
          </Row>
        ) : null}
      </Row>

      <Loading
        isLoading={!(mapIsLoaded && !isLoadingPlaces)}
        onLoaded={setIsReady}
      />

      <Row className={classNames("w-full h-full", !isReady && "hidden")}>
        {data.length && isDesktop ? (
          <Column
            className={`
              -mt-[2px] h-[calc(100vh-230px)] w-[50vw] overflow-y-scroll px-3
            `}
          >
            {placeCards}
          </Column>
        ) : null}
        <Column
          onClick={() => setSelectedPlaceId(null)}
          className={
            data.length
              ? `
                w-screen
                lg:w-[50vw]
              `
              : "w-full"
          }
        >
          <GeoMap
            ref={mapRef}
            onLoadedAction={setMapIsLoaded}
            onPlaceSelectedAction={(id) => {
              setSelectedPlaceId(id);

              if (isDesktop) {
                setTimeout(() => {
                  document.getElementById(String(id))?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 200);
              }
            }}
            selectedPlaceId={selectedPlaceId}
            zoom={14}
            showMe={showMe}
            distance={distance}
            location={location}
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
            googleMapsMapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? ""}
            locations={data}
          />
          <Row className="absolute mt-3 ml-3">
            <Phrase
              className={`
                bg-primary-1000/70 text-primary-0 rounded-md px-3 py-1 text-sm
              `}
            >
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
            className={`
              absolute bottom-0 box-border w-full grow justify-center
              lg:hidden
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedCard}
          </Row>
        </Column>
      </Row>
    </Column>
  );
};
