import { PlaceEntry } from "@/types";
import { useEffect, useState } from "react";

interface UseSearchPlacesParams {
  location?: {
    lat: number;
    lng: number;
  };
  distance: number;
  category: string;
}

export const useSearchPlaces = ({
  location,
  distance,
  category,
}: UseSearchPlacesParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Array<PlaceEntry>>([]);
  const [totalPlacesCount, setTotalPlacesCount] = useState(0);

  useEffect(() => {
    const handleSearchPlaces = async () => {
      if (!location) {
        setIsLoading(false);
        return;
      }

      try {
        const queryParams = new URLSearchParams({
          lat: location.lat.toString(),
          lng: location.lng.toString(),
          category: category === "all" ? "" : category,
          distance: distance.toString(),
        });
        const response = await fetch(`/api/places?${queryParams}`);
        const data = await response.json();

        setData(data.places || []);
        setTotalPlacesCount(data.totalPlacesCount || 0);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearchPlaces();
  }, [location, distance, category]);

  return { isLoading, data, totalPlacesCount };
};
