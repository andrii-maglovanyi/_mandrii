import { PlaceData } from "@/types";
import { useEffect, useState } from "react";

interface UseSearchPlacesParams {
  category?: string;
}

export const useSearchMyPlaces = ({ category }: UseSearchPlacesParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Array<PlaceData>>([]);

  useEffect(() => {
    const handleSearchPlaces = async () => {
      const params: Record<string, string> = {};

      try {
        if (category) {
          params.category = category === "all" ? "" : category;
        }

        const queryParams = new URLSearchParams(params);

        const response = await fetch(`/api/places/my?${queryParams}`);
        const data = await response.json();

        setData(data.places || []);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearchPlaces();
  }, [category]);

  return { isLoading, data };
};
