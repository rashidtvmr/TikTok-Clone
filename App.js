import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {VideoPlayer} from './src/components/VideoPlayer';
import ListView from './src/screens/HomePage';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headerText}>
          <Text style={{color: 'rgba(256,256,256,.7)', fontSize: 20}}>
            Following
          </Text>
          <Text style={{color: 'rgba(256,256,256,.7)', fontSize: 21}}> | </Text>
          <Text
            style={{
              color: 'rgba(256,256,256,1)',
              fontWeight: '900',
              fontSize: 20,
            }}>
            For You
          </Text>
        </View>
        <View style={styles.videoContainer}>
          {/* HomePage */}
          <ListView></ListView>
        </View>
        <NavigationBar></NavigationBar>
      </View>
    </>
  );
};

import PlusButton from './assets/plus.svg';
const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  headerText: {
    position: 'absolute',
    top: 20,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  videoContainer: {
    flex: 20,
  },
  navbarContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 3,
    backgroundColor: 'rgba(0,0,0,1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    elevation: 0,
  },
  nbCenterButton: {
    borderColor: '#fff',
    // borderWidth: 1,
    // backgroundColor: '#fff',
    // borderRadius: 10,
    elevation: 20,
    // paddingHorizontal: 20,
  },
  textDimmColor: {
    color: 'rgba(256,256,256,0.5)',
  },
});

export default App;
import {SvgUri} from 'react-native-svg';
const NavigationBar = (props) => {
  return (
    <View style={styles.navbarContainer}>
      <View>
        <Icon
          name="home"
          style={{fontSize: 22, marginHorizontal: 2, color: '#fff'}}></Icon>
        <Text style={{color: '#fff'}}>Home</Text>
      </View>
      <View>
        <Icon
          name="search"
          style={{
            fontSize: 22,
            marginHorizontal: 4,
            color: 'rgba(256,256,256,0.5)',
          }}></Icon>
        <Text style={({color: '#fff'}, styles.textDimmColor)}>Explore</Text>
      </View>

      <View style={styles.nbCenterButton}>
        <PlusButton width={'75'} height={'35'} />
        {/* <Image source="./assets/plus.svg" /> */}
        {/* <Text style={{color: '#000', fontSize: 32, fontWeight: '900'}}>+</Text> */}
      </View>
      <View>
        <Icon
          name="mail-outline"
          style={{
            fontSize: 22,
            marginHorizontal: 4,
            color: 'rgba(256,256,256,0.5)',
          }}></Icon>
        <Text style={({color: '#fff'}, styles.textDimmColor)}>Inbox</Text>
      </View>
      <View>
        <Icon
          name="person-outline"
          style={{
            fontSize: 22,
            marginHorizontal: -5,
            color: 'rgba(256,256,256,0.5)',
          }}></Icon>
        <Text style={({color: '#fff'}, styles.textDimmColor)}>Me</Text>
      </View>
    </View>
  );
};
