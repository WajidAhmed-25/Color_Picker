import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import './ColorPaletteExtractor.css';

function ColorPaletteExtractor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [error, setError] = useState(null);

  const dropRef = useRef(null);
  const dragCounterRef = useRef(dragCounter);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        extractColorPalette(reader.result);
      };
      reader.onerror = () => {
        setError('Error loading image');
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColorPalette = (imageDataUrl) => {
    const img = new Image();
    img.src = imageDataUrl;
    img.onerror = () => {
      setError('Error loading image');
    };
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 5);
      const hexPalette = palette.map((rgb) => rgbToHex(rgb));

      setColorPalette(hexPalette);
    };
  };

  const rgbToHex = (rgb) => {
    return '#' + rgb.map((value) => value.toString(16).padStart(2, '0')).join('');
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragCounter(dragCounterRef.current + 1);
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragCounter(dragCounterRef.current - 1);
    if (dragCounterRef.current - 1 === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
    setDragCounter(0);

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        extractColorPalette(reader.result);
      };
      reader.onerror = () => {
        setError('Error loading image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePalette = () => {
    const downloadLink = document.createElement('a');
    const paletteString = colorPalette.join('\n');
    const blob = new Blob([paletteString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = 'color-palette.txt';
    downloadLink.click();

    URL.revokeObjectURL(url);
    downloadLink.remove();
  };

  return (
    <div className="color-palette-extractor">
      <div
        className={`drop-area ${isDragging ? 'dragging' : ''}`}
        ref={dropRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <img src={selectedImage} alt="Uploaded" />}
        {error && <p className="error">{error}</p>}
        <div className="color-palette">
          {colorPalette.map((color, index) => (
            <div key={index} className="color-box" style={{ backgroundColor: color }}>
              {color}
            </div>
          ))}
        </div>
        {colorPalette.length > 0 && (
          <button className="save-button" onClick={handleSavePalette}>
            Save Palette
          </button>
        )}
      </div>
    </div>
  );
}

export default ColorPaletteExtractor;
