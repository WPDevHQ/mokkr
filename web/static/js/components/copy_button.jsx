import React from 'react';
import IconCopy from '../icons/icon_copy';

const CopyButton = () => {
  const onClick = (e) => {
    e.currentTarget.blur();
    e.currentTarget.setAttribute('aria-label', 'Copied!');
  };

  const onMouseLeave = (e) => {
    e.currentTarget.setAttribute('aria-label', 'Copy to clipboard');
  };

  return (
    <button
      className="a-icon-button a-icon-button--bg a-tooltip"
      aria-label="Copy to clipboard"
      onClick={onClick}
      onMouseLeave={onMouseLeave}
    >
      <IconCopy />
    </button>
  );
};

export default CopyButton;
