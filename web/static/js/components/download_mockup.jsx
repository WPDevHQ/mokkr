import React from 'react';
import canvg from 'canvg-origin';
import { saveAs } from 'file-saver';
import 'blueimp-canvas-to-blob';

const DownloadMockup = ({ previewClass, downloadable, url }) => {
  const download = () => {
    let svg = document.getElementsByClassName(previewClass)[0];
    svg = svg.cloneNode(true);
    svg.style.width = null;
    svg.style.height = null;

    const canvas = document.createElement('canvas');
    canvas.height = svg.getAttribute('height');
    canvas.width = svg.getAttribute('width');
    canvg(canvas, svg.outerHTML.trim(), { renderCallback: () => {
      canvas.toBlob((blob) => {
        saveAs(blob, `${url}-mockup.png`);
        canvas.remove();
        svg.remove();
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
  url: React.PropTypes.string,
};

export default DownloadMockup;
