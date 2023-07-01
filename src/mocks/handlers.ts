import { rest } from 'msw';

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/plants/nispe`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            measurements: {
              temperature: 30.6,
              humidity: 28.200001,
              light: 10,
            },
            _id: '649caa163968235e49716c23',
            timestamp: 1687988756,
          },
          {
            measurements: {
              temperature: 30.6,
              humidity: 27.9,
              light: 0,
            },
            _id: '649caa533968235e49716c25',
            timestamp: 1687988818,
          },
        ]),
      );
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/plants/nispe`,
    (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ msg: 'There was an error fetching Telemetry' }),
      );
    },
  ),
];
