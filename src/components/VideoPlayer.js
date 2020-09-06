import React, {Component, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

export const VideoPlayer = ({url, verticalContent, horizontalContent}) => {
  let [isVideoPaused, setVideoPaused] = useState(false);
  let [videoLength, setVideoLength] = useState(200);
  let [isLoading, setLoading] = useState(false);
  function videoProgress(e) {
    setVideoLength((videoLength = e.currentTime * 30));
    if (e.currentTime >= e.playableDuration) setVideoLength((videoLength = 0));
  }

  function onTouch() {
    setVideoPaused((isVideoPaused = !isVideoPaused));
  }

  function onLoad(data) {
    setLoading(false);
  }
  function onLoadStart(data) {
    setLoading(true);
  }
  return (
    <>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={50}></ActivityIndicator>
        </View>
      )}
      {!isLoading && (
        <>
          <View style={styles.otherContentTwo}>
            <HorizontalContent content={horizontalContent} />
          </View>
          <View style={styles.otherContentOne}>
            <VerticalContent content={verticalContent} />
          </View>
        </>
      )}
      {isVideoPaused && (
        <View
          style={{
            elevation: 9999,
            position: 'absolute',
            left: '40%',
            bottom: '50%',
          }}>
          <Icon name="caret-forward-circle-outline" size={80} />
        </View>
      )}
      <TouchableOpacity onPress={onTouch} activeOpacity={0.9}>
        <View>
          <Video
            repeat={true}
            onProgress={videoProgress}
            resizeMode={'cover'}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
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
import Avatar from '../../assets/avatar.svg';
const HorizontalContent = ({content}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          //   elevation: 70,
          //   borderRadius: 50,
          marginVertical: 4,
          //   marginHorizontal:4
        }}>
        <Avatar height={'50'} width={'55'} color="#fff" />
      </View>
      <View
        style={{
          elevation: 70,
          borderRadius: 50,
          marginVertical: 10,
        }}>
        <Icon name="heart-outline" color="red" size={40} />
        <Text style={{color: '#fff', marginLeft: 4}}>{content.likes}K</Text>
      </View>
      <View
        style={{
          elevation: 70,
          borderRadius: 50,
          marginVertical: 6,
        }}>
        <Icon name="chatbubble-ellipses-outline" size={40} color="#fff" />
        <Text style={{color: '#fff', marginLeft: 4}}>{content.comments}K</Text>
      </View>
      <View
        style={{
          elevation: 100,
          borderRadius: 50,
          marginVertical: 10,
        }}>
        <Icon name="arrow-redo-outline" size={40} color="#fff" />
        <Text style={{color: '#fff', marginLeft: 4}}>{content.messages}K</Text>
      </View>
      <View
        style={{
          height: 50,
          width: 50,
          elevation: 100,
          borderRadius: 50,
          backgroundColor: '#000',
          padding: 5,
          marginVertical: 10,
        }}>
        <Icon name="person-circle-outline" size={40} color="#fff" />
      </View>
    </View>
  );
};

const VerticalContent = ({content}) => {
  return (
    <View style={{width: 500, flex: 1, flexDirection: 'column'}}>
      <Text style={{fontSize: 20, color: '#fff', marginVertical: 3}}>
        @{content.name}
      </Text>
      <Text style={{fontSize: 20, color: '#fff', marginVertical: 3}}>
        {content.sentence}
      </Text>
      <Text style={{fontSize: 20, color: '#fff', marginVertical: 3}}>
        <Icon name="musical-notes-outline" color="#fff" size={20} />{' '}
        {content.song}
      </Text>
    </View>
  );
};
var styles = StyleSheet.create({
  backgroundVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  otherContentOne: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    elevation: 1,
    alignSelf: 'center',
  },
  otherContentTwo: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    elevation: 1,
    alignSelf: 'center',
  },
  loader: {
    position: 'absolute',
    width: 100,
    bottom: '50%',
    elevation: 1,
    alignSelf: 'center',
  },
});
