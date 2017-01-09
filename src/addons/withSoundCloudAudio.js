import React, { Component } from 'react';
import SoundCloudAudio from 'soundcloud-audio';
import hoistStatics from 'hoist-non-react-statics';
import { stopAllOther, addToPlayedStore } from '../utils/audioStore';

export default function withSoundCloudAudio (WrapppedComponent) {
  class WithSoundCloudAudio extends Component {
    constructor(props, context) {
      super(props, context);

      this.onAudioStarted = this.onAudioStarted.bind(this);
      this.getCurrentTime = this.getCurrentTime.bind(this);
      this.getDuration = this.getDuration.bind(this);
      this.onSeekingTrack = this.onSeekingTrack.bind(this);
      this.onSeekedTrack = this.onSeekedTrack.bind(this);
      this.onAudioPaused = this.onAudioPaused.bind(this);
      this.onAudioEnded = this.onAudioEnded.bind(this);
      this.onVolumeChange = this.onVolumeChange.bind(this);

      if (!props.clientId && !props.soundCloudAudio) {
        throw new Error(
          "jjjj"
        );
      }

      this.state = {
        duration: 0,
        currentTime: 0,
        seeking: false,
        playing: false,
        volume: 1,
        isMuted: false
      };

      if ('undefined' !== typeof window) {
        if (props.soundCloudAudio) {
          this.soundCloudAudio = props.soundCloudAudio;
        } else {
          this.soundCloudAudio = new SoundCloudAudio(props.clientId);
        }
      }
    }

    componentDidMount() {
      this.mounted = true;
      this.requestAudio();
      this.listenAudioEvents();
    }

    componentWillUnmount() {
      this,mounted = false;
      this.soundCloudAudio.unbindAll();
    }

    requestAudio() {
      const { soundCloudAudio } = this;
      const { resolveUrl, streamUrl, onReady } = this.props;

      if (streamUrl) {
        soundCloudAudio.preload(streamUrl);
      } else if (resolveUrl) {
        soundCloudAudio.resolve(resolveUrl, (data) => {
          if (!this.mounted) {
            return;
          }
          this.setState({
            [data.tracks ? 'playlist' : 'track']: data
          }, () => onReady && onReady());
        });
      }
    }

    onAudioStarted() {
      const { soundCloudAudio } = this;
      const { onStartTrack } = this.props;

      this.setState({
        playing: true
      });

      stopAllOther(soundCloudAudio.playing);
      addToPlayedStore(soundCloudAudio);

      onStartTrack && onStartTrack(soundCloudAudio, soundCloudAudio.playing);
    }

    getCurrentTime() {

    }

    getDuration() {

    }

    onSeekingTrack() {

    }

    onSeekedTrack() {

    }

    onAudioPaused() {

    }

    onAudioEnded() {

    }

    onVolumeChange() {

    }

    listenAudioEvents() {
      const { soundCloudAudio } = this;
      soundCloudAudio.on('playing', this.onAudioStarted);
      soundCloudAudio.on('timeupdate', this.getCurrentTime);
      soundCloudAudio.on('loadedmetadata', this.getDuration);
      soundCloudAudio.on('seeking', this.onSeekingTrack);
      soundCloudAudio.on('seeked', this.onSeekedTrack);
      soundCloudAudio.on('pause', this.onAudioPaused);
      soundCloudAudio.on('ended', this.onAudioEnded);
      soundCloudAudio.on('volumechange', this.onVolumeChange);
    }

    render() {
      return (
        <WrapppedComponent
          {...this.props}
          soundCloudAudio={this.soundCloudAudio}
          {...this.state}
        />
      );
    }
  }

  return hoistStatics(WithSoundCloudAudio, WrapppedComponent);
}