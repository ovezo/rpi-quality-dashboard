import React, { useEffect, useRef } from 'react';
import { fromBlob } from 'geotiff';

const TiffViewer = ({ file }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const renderTiff = async (blob) => {
      try {
        const tiff = await fromBlob(blob);
        const image = await tiff.getImage();
        const width = image.getWidth();
        const height = image.getHeight();

        console.log('Image Dimensions:', width, height);

        // Read the raster data
        const data = await image.readRasters({ interleave: true });
        console.log('Raster Data:', data);

        // Find the min and max values in the raster data for normalization
        let minValue = Infinity;
        let maxValue = -Infinity;

        // Calculate min and max values
        for (let i = 0; i < data.length; i++) {
          const value = data[i];
          if (value < minValue) minValue = value;
          if (value > maxValue) maxValue = value;
        }

        // Ensure data is in Uint8ClampedArray format for ImageData
        const imageDataArray = new Uint8ClampedArray(width * height * 4);

        // Copy data to imageDataArray and normalize the values
        for (let i = 0; i < width * height; i++) {
          const value = data[i]; // Grayscale value

          // Normalize the value to the range 0-255
          const normalizedValue = ((value - minValue) / (maxValue - minValue)) * 255;
          const clampedValue = Math.min(255, Math.max(0, normalizedValue));

          imageDataArray[i * 4] = clampedValue;       // R
          imageDataArray[i * 4 + 1] = clampedValue;   // G
          imageDataArray[i * 4 + 2] = clampedValue;   // B
          imageDataArray[i * 4 + 3] = 255;           // A
        }

        // Create an ImageData object
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        const imageData = new ImageData(imageDataArray, width, height);

        // Draw the image on the canvas
        ctx.putImageData(imageData, 0, 0);
      } catch (error) {
        console.error('Error processing TIFF file:', error);
      }
    };

    if (file) {
      renderTiff(file);
    }
  }, [file]);

  return <canvas ref={canvasRef} style={{ maxWidth: '100%' }}></canvas>;
};

export default TiffViewer;
