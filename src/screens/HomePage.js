import React, {memo, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Button,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  BaseScrollView,
} from 'recyclerlistview'; // Version can be specified in package.json

import {VideoPlayer} from '../components/VideoPlayer';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

let containerCount = 0;

let pageSize = 0;

let {width, height} = Dimensions.get('window');

export const HomePage = memo(() => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [dataProvider, setDataProvider] = useState(dataProviderMaker(data));

  const _layoutProvider = useRef(layoutMaker()).current;

  const listView = useRef();
  const load = async (data, more = false) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({page: pageSize});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      if (more) setIsLoadingMore(more);
      else setIsLoading(true);

      const resData = await fetch(
        'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
        requestOptions,
      );
      let json = await resData.json();
      setData([...data, ...json]);
    } catch (error) {
      console.log(e);
    } finally {
      if (more) {
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 5000);
      } else {
        setIsLoading(false);
        setIsLoadingMore(false);
        !loaded && setLoaded(true);
      }
    }
  };

  //

  const loadMore = () => {
    console.log('End Reached', pageSize);
    pageSize++;
    load([...data], true);
  };

  const refresh = async () => {
    pageSize = 0;
    load([]);
  };

  useEffect(() => {
    load([]);
    return;
  }, []);

  useEffect(() => {
    setDataProvider(dataProviderMaker(data));
  }, [data]);

  if (!loaded && isLoading)
    return (
      <ActivityIndicator
        style={{
          position: 'absolute',
          top: 30,
          alignSelf: 'center',
          elevation: 9999,
        }}
        size="large"
      />
    );

  if (!data.length) return null;

  return (
    <View style={{flex: 1}}>
      <RecyclerListView
        ref={listView}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl
              refreshing={loaded && isLoading}
              onRefresh={() => refresh()}
            />
          ),
        }}
        renderFooter={() => <RenderFooter loading={isLoadingMore} />}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={1}
        externalScrollView={ExternalScrollView}
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
      />
    </View>
  );
});

const layoutMaker = () =>
  new LayoutProvider(
    (index) => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      dim.height = height - 72;
      dim.width = width;
    },
  );
import * as faker from 'faker';
const rowRenderer = (type, data) => {
  let verticalContent = {
    name: faker.name.lastName(),
    sentence: faker.lorem.words(),
    song: faker.lorem.sentence(),
  };

  let hc = {
    likes: parseInt(faker.random.number()) / 100,
    comments: parseInt(faker.random.number()) / 100,
    messages: parseInt(faker.random.number()) / 100,
  };
  return (
    <>
      <VideoPlayer
        url={data}
        horizontalContent={hc}
        verticalContent={verticalContent}
      />
    </>
  );
};

const RenderFooter = ({loading}) =>
  loading && (
    <ActivityIndicator
      style={{margin: 20, alignSelf: 'center', flex: 1}}
      size="large"
      color="black"
    />
  );

const dataProviderMaker = (data) =>
  new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);

const generateArray = (n) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
};

class ExternalScrollView extends BaseScrollView {
  scrollTo(...args) {
    if (this._scrollViewRef) {
      // this._scrollViewRef.scrollTo(...args);
    }
  }

  render() {
    return (
      <ScrollView
        centerContent={true}
        pagingEnabled={true}
        {...this.props}
        // ref={(scrollView) => {
        //   this._scrollViewRef = scrollView;
        // }}
      />
    );
  }
}

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
    this._containerId = containerCount++;
  }
  render() {
    return (
      <View {...this.props}>
        {this.props.children}
        <Text>Cell Id: {this._containerId}</Text>
      </View>
    );
  }
}

const fake = (data) => {
  return new Promise(function (resolve, reject) {
    try {
      setTimeout(() => {
        resolve(data);
      }, 3000);
    } catch (e) {
      reject(e);
    }
  });
};

const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'orange',
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'yellow',
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
  },
};
