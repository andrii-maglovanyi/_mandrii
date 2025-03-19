interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
}

interface GeocodeResponse {
  results: {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
  }[];
  status: string;
}

export const extractLocationData = (response: GeocodeResponse) => {
  if (!response.results.length) return null;

  const res = response.results[0];

  let city: string | null = null;
  let country: string | null = null;
  let area: string | null = null;
  const address = res.formatted_address;
  const { lat, lng } = res.geometry.location;
  const coordinates: [number, number] = [lng, lat];

  for (const component of res.address_components) {
    if (
      component.types.includes("locality") ||
      component.types.includes("postal_town")
    ) {
      city = component.long_name;
    } else if (component.types.includes("country")) {
      country = component.long_name;
    } else if (component.types.includes("route")) {
      area = component.short_name;
    }
  }

  if (!city || !country || !area || !address) return null;

  return { address, area, city, coordinates, country };
};
