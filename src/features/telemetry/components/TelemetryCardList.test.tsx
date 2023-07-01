import { screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { renderWithProviders } from '../../../mocks/test-utils';
import TelemetryCardList from './TelemetryCardList';

import * as Redux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
describe('Given a telemetry list component,', () => {
  const useSelectorMock = jest.spyOn(Redux, 'useSelector');

  test('when the page loads, it should show a list of cards', async () => {
    useSelectorMock.mockReturnValue({
      measurements: {
        temperature: 30.6,
        humidity: 27.9,
        light: 0,
      },
      _id: '649caa533968235e49716c25',
      timestamp: 1687988818,
    });
    renderWithProviders(
      <Provider store={store}>
        <TelemetryCardList />
      </Provider>,
    );

    await waitFor(() => {
      const listItem = screen.getAllByRole('card');
      expect(listItem.length).toBe(3);
    });
    expect(useSelectorMock).toHaveBeenCalled();
  });
});
