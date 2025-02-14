/**
 * Generates lat/lng coordinates approximating a circle.
 * @param center The center of the circle (lat/lng).
 * @param radiusInMeters The radius in meters.
 * @param points How many segments to approximate the circle (default 60).
 */
function createDashedCirclePath(
  center: google.maps.LatLngLiteral,
  radiusInMeters: number,
  points = 60
): google.maps.LatLngLiteral[] {
  const result: google.maps.LatLngLiteral[] = [];
  const metersPerDegreeLat = 111320; // approximate
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const latOffset = (radiusInMeters * Math.cos(angle)) / metersPerDegreeLat;

    // Adjust for longitude, which shrinks with cos(latitude)
    const lngOffset =
      (radiusInMeters * Math.sin(angle)) /
      (metersPerDegreeLat * Math.cos((center.lat * Math.PI) / 180));

    result.push({
      lat: center.lat + latOffset,
      lng: center.lng + lngOffset,
    });
  }
  // Close the path by pushing the first coordinate again
  result.push(result[0]);
  return result;
}

export const createDashedCirclePolyline = (
  map: google.maps.Map,
  center: google.maps.LatLngLiteral,
  radiusInMeters: number
) => {
  const path = createDashedCirclePath(center, radiusInMeters, 80);

  // Create the polyline. We'll use icons to simulate a dash pattern.
  return new google.maps.Polyline({
    path,
    strokeOpacity: 0, // hide the "normal" stroke so we only see the dashed icons
    strokeWeight: 2,
    map,
    icons: [
      {
        icon: {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
          scale: 2, // size of each dash segment
        },
        offset: "0",
        repeat: "10px", // distance between dashes
      },
    ],
  });
};
