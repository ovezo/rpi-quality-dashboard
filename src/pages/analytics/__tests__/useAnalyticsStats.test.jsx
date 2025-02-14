import { renderHook, act } from '@testing-library/react-hooks';
import useAnalyticsStats from '../useAnalyticsStats';
import { api } from '../../../store/api';
import { vi } from 'vitest';
import { waitFor } from '@testing-library/react';

vi.mock('../../../store/api', () => ({
  api: {
    get: vi.fn()
  }
}));

describe('useAnalyticsStats', () => {
  beforeEach(() => {
    api.get.mockReset();
  });

  test('fetches statsPerDefect and counts when dates and deviceName change', async () => {
    const { result } = renderHook(() => useAnalyticsStats());

    const mockCounts = { total: 10, normal: 8 };
    api.get.mockImplementation(() => Promise.resolve({ data: mockCounts }));

    act(() => {
      result.current.setDates({ start_date: '2024-05-01', end_date: '2024-05-31' });
      result.current.setDeviceName('Device1');
    });

    await waitFor(() => {
      expect(result.current.counts).toEqual(mockCounts);

      expect(api.get).toHaveBeenCalledWith({ url: 'stats-per-defect?start_date=2024-05-01&end_date=2024-05-31&device_name=Device1' });
      expect(api.get).toHaveBeenCalledWith({ url: 'detections/count?start_date=2024-05-01&end_date=2024-05-31&device_name=Device1' });
    });
  });

  test('fetches statsPerDevice when dates change', async () => {
    const { result } = renderHook(() => useAnalyticsStats());

    const mockStatsPerDevice = [{ id: 1, name: 'Device1' }];
    api.get.mockImplementation(() => Promise.resolve({ data: mockStatsPerDevice }));

    act(() => {
      result.current.setDates({ start_date: '2024-05-01', end_date: '2024-05-31' });
    });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith({ url: 'stats-per-device?start_date=2024-05-01&end_date=2024-05-31' });
    });
  });
});
