import { renderHook, act} from '@testing-library/react-hooks';
import useFrames from '../useFrames';
import { api } from '../../../store/api';
import { useParams } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../../store/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('useFrames', () => {
  beforeEach(() => {
    api.get.mockReset();
  });

  test('fetches frames data with date range on mount', async () => {
    let deviceName = 'testDevice'
    vi.mocked(useParams).mockReturnValue({ device_name: deviceName });

    const mockDateRange = {
      startDate: '2024-05-29 12:00',
      endDate: '2024-05-30 12:00',
    };

    api.get.mockImplementation(() => Promise.resolve({ data: [] }));
   
    const { result } = renderHook(() => useFrames());

    const utcTime = {}

    act(() => {
      result.current.setDateRange(mockDateRange);
      utcTime.startDate = result.current.convertToUTCTimezone(mockDateRange.startDate)
      utcTime.endDate = result.current.convertToUTCTimezone(mockDateRange.endDate)
    });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith({
        url:
          `detections/frames?device_name=${deviceName}&start_date=${utcTime.startDate}&end_date=${utcTime.endDate}`,
      });
    })
  });

});
