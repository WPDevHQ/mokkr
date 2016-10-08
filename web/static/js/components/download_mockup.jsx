import React from 'react';
import canvg from 'canvg-origin';
import { saveAs } from 'file-saver';
import 'blueimp-canvas-to-blob';

const DownloadMockup = ({ previewClass, downloadable }) => {
  const download = () => {
    const svg = document.getElementsByClassName(previewClass)[0];
    const canvas = document.createElement('canvas');
    canvas.height = svg.getAttribute('height');
    canvas.width = svg.getAttribute('width');
    canvg(canvas, svg.parentNode.innerHTML.trim(), { renderCallback: () => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'mockup.png');
      });
    } });
  };

  if (!downloadable) {
    return null;
  }

  return (
    <button className="a-button" onClick={download}>Download image</button>
  );
};

DownloadMockup.propTypes = {
  previewClass: React.PropTypes.string.isRequired,
  downloadable: React.PropTypes.bool.isRequired,
};

export default DownloadMockup;
