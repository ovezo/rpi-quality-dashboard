import resolveConfig from 'tailwindcss/resolveConfig';
import { io } from 'socket.io-client';
import moment from 'moment/moment';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const formatThousands = (value) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const defectRelabeling = {
  'F': "(A) Leading",
  'A': "(B) Leading / Right",
  'E': "(C) Leading / Left",
  'B': "(D) Trailing / Right", 
  'D': "(E) Trailing / Left",
  'C': "Trailing",
  'unpacked_box': "Unpacked",
  'normal': "Normal",
}

export const convertToLocalTimezone = (datetime, time = 'HH:mm') => {
  let utc = moment.utc(datetime);
  return moment(utc).local().format(`YYYY-MM-DD ${time}`);
}

export const convertToUTCTimezone = (datetime, time = 'HH:mm') => {
  return moment(datetime).utc().format(`YYYY-MM-DD ${time}`);
}

export const getDateTime = (value, type='days') => {
  return moment().subtract(value, type).utc().format('YYYY-MM-DD HH:mm:ss');
};

const SOCKET_URL = process.env.DEVICE_BACKEND_URL;
export const socket = io(SOCKET_URL, { transports : ['websocket'] });