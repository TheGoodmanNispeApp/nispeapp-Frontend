import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { errorHandlers } from '../../mocks/handlers';
import { server } from '../../mocks/server';
import { renderWithProviders } from '../../mocks/test-utils';
import Dashboard from './Dashboard';

describe('Given a Dashboard page component,', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('when the page loads, it should show a list of telemetry cards', async () => {
    renderWithProviders(
      <Provider store={store}>
        <Dashboard />,
      </Provider>,
    );

    await waitFor(() => {
      const listItem = screen.getAllByRole('card');
      expect(listItem.length).toBe(3);
    });
  });
  test('when the page loads and there is an error from DDBB, it should show an error message', async () => {
    server.use(...errorHandlers);
    renderWithProviders(
      <Provider store={store}>
        <Dashboard />,
      </Provider>,
    );
    await waitFor(() => {
      const errorItem = screen.getByRole('error-message');
      expect(errorItem.textContent).toEqual(
        'There was an error fetching Telemetry',
      );
    });
  });
  test('when the user clicks on the refresh button, telemetry cards should be updated with latest value', async () => {
    renderWithProviders(
      <Provider store={store}>
        <Dashboard />,
      </Provider>,
    );
    let telemetryTextItemsBefore: HTMLElement[];

    await waitFor(() => {
      telemetryTextItemsBefore = screen.getAllByRole('telemetry-text');
    });

    await waitFor(() => {
      server.use(
        rest.get(
          `${process.env.REACT_APP_API_URL}/api/v1/plants/nispe`,
          (_req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json([
                {
                  measurements: {
                    temperature: 31.200001,
                    humidity: 28.299999,
                    light: 1349,
                  },
                  _id: '649de050e4f7b85906e86015',
                  timestamp: 1688068174,
                },
                {
                  measurements: {
                    temperature: 20.200001,
                    humidity: 15.299999,
                    light: 1234,
                  },
                  _id: '649de08de4f7b85906e86017',
                  timestamp: 1688068236,
                },
              ]),
            );
          },
        ),
      );
      const icon = screen.getByRole('icon');
      userEvent.click(icon);
    });

    await waitFor(() => {
      const telemetryTextItems = screen.getAllByRole('telemetry-text');
      telemetryTextItems.forEach((item, i) => {
        expect(telemetryTextItemsBefore[i].textContent).not.toEqual(
          item.textContent,
        );
        expect(telemetryTextItems[0].textContent).toEqual('1234 ');
        expect(telemetryTextItems[1].textContent).toEqual('20.2 ºC');
        expect(telemetryTextItems[2].textContent).toEqual('15.3 %');
      });
    });
  });
});
