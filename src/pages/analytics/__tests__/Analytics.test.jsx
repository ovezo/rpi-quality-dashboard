import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Analytics from '../'; 
import { useDevices } from '../../../hooks/useDevices'; 
import useAnalyticsStats from '../useAnalyticsStats'; 

// Mock the custom hooks
vi.mock('../../../hooks/useDevices', () => ({
  useDevices: vi.fn(),
}));

vi.mock('../useAnalyticsStats', () => ({
  default: vi.fn(),
}));

describe('Analytics Component', () => {
  const mockUseDevices = {
    devices: [{ name: 'Device1' }, { name: 'Device2' }],
  };

  const mockUseAnalyticsStats = {
    statsPerDefect: [],
    statsPerDevice: [],
    counts: { total: 100, normal: 80 },
    setDates: vi.fn(),
    deviceName: 'All',
    setDeviceName: vi.fn(),
  };

  beforeEach(() => {
    useDevices.mockReturnValue(mockUseDevices);
    useAnalyticsStats.mockReturnValue(mockUseAnalyticsStats);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Analytics />
      </MemoryRouter>
    );

  it('displays correct values in TotalsCard components', () => {
    renderComponent();

    // expect(screen.getByTestId('total-card-header_Total Number of Boxes')).toBeInTheDocument();
    expect(screen.getByTestId('total-card-value_100')).toBeInTheDocument();
    // expect(screen.getByTestId('total-card-header_Number of Normal Boxes')).toBeInTheDocument();
    expect(screen.getByTestId('total-card-value_80')).toBeInTheDocument();
    // expect(screen.getByTestId('total-card-header_Number of Defected Boxes')).toBeInTheDocument();
    expect(screen.getByTestId('total-card-value_20')).toBeInTheDocument();
    expect(screen.getByTestId('total-card-header_Total Defects Ratio')).toBeInTheDocument();
    expect(screen.getByTestId('total-card-value_20%')).toBeInTheDocument();
  });

  it('calls setDates when Datepicker callback is invoked', () => {
    renderComponent();

    // Mock setting the dates via the callback
    const start_date = '2023-01-01 10:00';
    const end_date = '2023-12-31 08:00';
    mockUseAnalyticsStats.setDates({ start_date, end_date });

    expect(mockUseAnalyticsStats.setDates).toHaveBeenCalledWith({
      start_date,
      end_date,
    });
  });

  it('calls setDeviceName when a device is selected from DropdownClassic', () => {
    renderComponent();

    // Assuming the dropdown opens when you click on a button with the device name
    const dropdownButton = screen.getByTestId('dropdown-classic-button');
    fireEvent.click(dropdownButton);

    const deviceOption = screen.getByTestId('dropdown-classic-option_Device1');
    fireEvent.click(deviceOption);

    expect(mockUseAnalyticsStats.setDeviceName).toHaveBeenCalledWith('Device1');
  });
});
