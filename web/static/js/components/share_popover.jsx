import React from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import CopyButton from './copy_button';

class sharePopover extends React.Component {
  constructor() {
    super();
    this.state = {
      value: window.location.href,
      copied: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url) {
      this.state.value = window.location.href;
    }
  }

  onFocus(e) {
    e.target.select();
  }

  render() {
    return (
      <div className="m-popover">
        <span className="m-popover__label">Link to this mockup</span>
        <div className="m-input-group">
          <input
            className="m-popover__input"
            type="text"
            value={this.state.value}
            readOnly
            onFocus={this.onFocus}
            onChange={({ target: { value } }) => this.setState({ value, copied: false })}
          />
          <CopyToClipboard
            text={this.state.value}
            onCopy={() => this.setState({ copied: true })}
          >
            <CopyButton />
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ url: state.mockup.url });

sharePopover.propTypes = {
  sharePopover: React.PropTypes.string,
};

const SharePopover = connect(mapStateToProps)(sharePopover);

export default SharePopover;
