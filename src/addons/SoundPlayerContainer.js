import React, { PropTypes, Component } from 'react';
import withSoundCloudAudio from './withSoundCloudAudio';
import SoundCloudAudio from 'soundcloud-audio';

class SoundPlayerContainer extends Component {
  constrcutor(props) {
    super(props);
    this.wrapChild = this.wrapChild.bind(this);
  }

  wrapChild(child) {
    return React.cloneElement(child, this.props);
  }

  render() {
    const { children } = this.props;

    if (!children) {
      return;
    }

    if (!Array.isArray(children)) {
      return this.wrapChild(children);
    }

    return (
      <span>
        {React.Children.map(children, this.wrapChild)}
      </span>
    );
  }
}

SoundPlayerContainer.propTypes = {
  streamUrl: PropTypes.string,
  resolveUrl: PropTypes.string,
  clientId: PropTypes.string,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio),
  onStartTrack: PropTypes.func,
  onStopTrack: PropTypes.func,
  onPauseTrack: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onReady: PropTypes.func
}

export default withSoundCloudAudio(SoundPlayerContainer);