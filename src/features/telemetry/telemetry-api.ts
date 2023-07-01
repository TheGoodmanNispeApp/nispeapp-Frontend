export const getTelemetry = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/plants/nispe`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};
