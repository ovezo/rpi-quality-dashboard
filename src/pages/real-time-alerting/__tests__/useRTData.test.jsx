import { renderHook } from '@testing-library/react-hooks';
import useRTData from '../useRTData';
import { api } from '../../../store/api';
import { socket } from '../../../utils/Utils';
import { useParams } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../../store/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

vi.mock('../../../utils/Utils', () => ({
  socket: {
    connect: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}));

describe('useRTData', () => {
  beforeEach(() => {
    api.get.mockReset();
    socket.connect.mockReset();
    socket.on.mockReset();
    socket.off.mockReset();
  });

  test('fetches device and detections count data on mount', async () => {
    let deviceName = 'testDevice'
    vi.mocked(useParams).mockReturnValue({ device_name: deviceName });

    const mockDeviceData = { name: 'testDevice' };
    const mockDetectionsCountData = { total: 10, normal: 8 };

    api.get
      .mockResolvedValueOnce({ status: 200, data: mockDeviceData })
      .mockResolvedValueOnce({ status: 200, data: mockDetectionsCountData });

    const { result, waitForNextUpdate } = renderHook(() => useRTData());

    await waitForNextUpdate();

    expect(api.get).toHaveBeenCalledWith({ url: `devices/${deviceName}` });
    expect(api.get).toHaveBeenCalledWith({ url: `detections/count?device_name=${deviceName}` });
    expect(result.current.device).toEqual(mockDeviceData);
    expect(result.current.counts).toEqual(mockDetectionsCountData);
  });

  // Add more tests as needed...
});
