import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import SoundCloudAudio from 'soundcloud-audio';

class PlayButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { playing, soundCloudAudio, onTogglePlay } = this.props;

    if (!playing) {
      soundCloudAudio && soundCloudAudio.play({

      })
    } else {
      soundCloudAudio && soundCloudAudio.pause();
    }
  }

  render() {
    const { playing, seekingIcon, seeking, className, style } = this.props;

    let iconNode;
    if (seeking && seekingIcon) {
      iconNode = React.cloneElement(seekingIcon);
    } else if (playing) {
      iconNode = <PauseIconSVG />;
    } else {
      iconNode = <PlayIconSVG />;
    }

    const classNames = ClassNames('sb-soundplayer-play-btn', className);

    return (
      <button
        type="button"
        className={classNames}
        style={style}
        onClick={this.handleClick}
      >
        {iconNode}
      </button>
    );
  }
}

PlayButton.propTypes = {
  className: PropTypes.string,
  seeking: PropTypes.bool,
  playing: PropTypes.bool,
  onTogglePlay: PropTypes.func,
  seekingIcon: PropTypes.node,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio)
}

PlayButton.defaultProps = {
  playing: false,
  seeking: false
};

export default PlayButton;