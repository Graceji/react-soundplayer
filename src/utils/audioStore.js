
const _playedAudios = [];

function each(arr, cb) {
  if (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] && cb(arr[i], i, arr)) {
        break;
      }
    }
  }
}

export function stopAllOther(playing) {
  each(_playedAudios, soundCloudAudio => {
    if (soundCloudAudio.playing && soundCloudAudio.playing !== playing) {
      soundCloudAudio.stop();
    }
  });
}

export function addToPlayedStore(soundCloudAudio) {
  let isPresent = false;
}