import React, {Component, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import Video from 'react-native-video';

export const VideoPlayer = ({url}) => {
  let [isVideoPaused, setVideoPaused] = useState(false);
  let [videoLength, setVideoLength] = useState(200);

  function videoProgress(e) {
    setVideoLength((videoLength = e.currentTime * 30));
    if (e.currentTime >= e.playableDuration) setVideoLength((videoLength = 0));
  }

  function onTouch() {
    setVideoPaused((isVideoPaused = !isVideoPaused));
  }

  function onLoad() {}
  return (
    <>
      <TouchableOpacity onPress={onTouch} activeOpacity={0.9}>
        <View>
          <View style={styles.otherContent}></View>
          <Video
            repeat={true}
            onProgress={videoProgress}
            resizeMode={'cover'}
            onLoad={onLoad}
            source={{uri: url.playbackUrl.toString()}}
            // source={{
            //   uri:
            //     'https://stream.mux.com/D3g6GK02sh01fyuoazi6ftI7CdPkK02n7stUfWClNjKVfM.m3u8',
            // }}
            paused={isVideoPaused}
            style={styles.backgroundVideo}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: videoLength,
          position: 'relative',
          top: -1,
          height: 1,
          backgroundColor: 'orange',
        }}></View>
    </>
  );
};
var styles = StyleSheet.create({
  backgroundVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'orange',
  },
  otherContent: {
    position: 'absolute',
    bottom: 100,
    top: 100,
    height: 100,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
