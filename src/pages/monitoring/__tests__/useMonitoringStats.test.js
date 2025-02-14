import { renderHook, act } from '@testing-library/react-hooks';
import useMonitoringStats from '../useMonitoringStats'; // Import the hook
import { vi } from 'vitest';

// Mock current date
const originalDate = Date;

beforeEach(() => {
  const mockDate = new Date('2024-05-27T10:00:00Z');
  global.Date = vi.fn(() => mockDate);
  global.Date.now = originalDate.now;
});

afterEach(() => {
  global.Date = originalDate;
});

describe('useMonitoringStats', () => {
  it('sets default values correctly', () => {
    // Render the hook
    const { result } = renderHook(() => useMonitoringStats());

    // Check default values
    expect(result.current.statistics).toEqual([]);
    expect(result.current.dateRange.startDate).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    expect(result.current.dateRange.endDate).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    expect(result.current.deviceName).toBe('All');
  });

  it('updates device name correctly', () => {
    // Render the hook
    const { result } = renderHook(() => useMonitoringStats());

    // Update device name
    act(() => {
      result.current.setDeviceName('EVO-Medium-closer');
    });

    // Check if device name is updated
    expect(result.current.deviceName).toBe('EVO-Medium-closer');
  });

  it('updates date range correctly', () => {
    // Render the hook
    const { result } = renderHook(() => useMonitoringStats());

    // Update date range
    act(() => {
      result.current.setDateRange({
        startDate: '2024-05-25 10:00',
        endDate: '2024-05-26 10:00'
      });
    });

    // Check if date range is updated
    expect(result.current.dateRange).toEqual({
      startDate: '2024-05-25 10:00',
      endDate: '2024-05-26 10:00'
    });
  });

});
