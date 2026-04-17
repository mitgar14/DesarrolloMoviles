const API_KEY = "692a28151fa2446582960863c7ef32f6";

export const getAddress = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const searchNearby = async (lat: number, lng: number) => {
  const offsets = [
    { dlat: 0.002, dlng: 0 },
    { dlat: -0.002, dlng: 0 },
    { dlat: 0, dlng: 0.002 },
    { dlat: 0, dlng: -0.002 },
  ];

  const results = await Promise.all(
    offsets.map(async ({ dlat, dlng }) => {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat + dlat}+${lng + dlng}&key=${API_KEY}`
      );
      const data = await res.json();
      if (data.results?.[0]) {
        return {
          formatted: data.results[0].formatted,
          lat: data.results[0].geometry.lat,
          lng: data.results[0].geometry.lng,
        };
      }
      return null;
    })
  );

  return results.filter(Boolean);
};
