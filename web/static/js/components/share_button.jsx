import React from 'react';
import SharePopover from './share_popover';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopover: false,
    };

    this.showPopover = this.showPopover.bind(this);
  }

  showPopover() {
    const showPopover = !this.state.showPopover;
    this.setState({ showPopover });
  }

  render() {
    if (!this.props.downloadable) {
      return null;
    }

    return (
      <div className="m-button-popover-group">
        <button className="a-button" onClick={this.showPopover}>Share mockup</button>
        {this.state.showPopover ? <SharePopover /> : null}
      </div>
    );
  }
}

ShareButton.propTypes = {
  downloadable: React.PropTypes.bool.isRequired,
};

export default ShareButton;
