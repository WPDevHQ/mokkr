import React from 'react';
import canvg from 'canvg-origin';
import FileSaver,{ saveAs } from 'file-saver';

const DownloadMockup = ({ previewClass }) => {
  const download = () => {
    const svg = document.getElementsByClassName(previewClass)[0];
    const canvas = document.createElement('canvas');
    canvas.height = svg.getAttribute('height');
    canvas.width = svg.getAttribute('width');
    canvg(canvas, svg.parentNode.innerHTML.trim(), {renderCallback: function() {
      let dataURL = canvas.toDataURL('image/png');
      let data = atob(dataURL.substring('data:image/png;base64,'.length)),
          asArray = new Uint8Array(data.length);

      for (let i = 0, len = data.length; i < len; ++i) {
            asArray[i] = data.charCodeAt(i);
      }

      let blob = new Blob([asArray.buffer], {type: 'image/png'});
      saveAs(blob, 'mockup.png');
    }});
  };

  return (
    <a onClick={download} href="#">Download</a>
  );
};

export default DownloadMockup;
