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

const pageSize = 4;

let {width, height} = Dimensions.get('window');

const ListView = memo(() => {
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

    var raw = JSON.stringify({page: 1000});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      if (more) setIsLoadingMore(!!more);
      else setIsLoading(true);

      const resData = await fetch(
        'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',
        requestOptions,
      );
      let json = await resData.json();
      setData(json);
    } catch (error) {
      console.log(e);
    } finally {
      if (more) {
        setIsLoadingMore(false);
      } else {
        setIsLoading(false);
        setIsLoadingMore(false);
        !loaded && setLoaded(true);
      }
    }
  };

  //

  const loadMore = () => {
    console.log('end');
    load([...data, ...generateArray(pageSize)], true);
  };

  const refresh = async () => {
    load(generateArray(pageSize));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      //   listView?.scrollTo({y: 300, animated: true});
    }, 5000);

    load(generateArray(pageSize));

    return () => {
      clearTimeout(timeout);
    };
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
      {/* <Button title="Refresh" onPress={() => refresh()} /> */}
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
        style={{elevation: 10}}
      />

      {/* <Button title="Load More" onPress={() => loadMore()} /> */}
    </View>
  );
});

const layoutMaker = () =>
  new LayoutProvider(
    (index) => {
      return ViewTypes.FULL;
      // if (index % 3 === 0) {
      //   return ViewTypes.FULL;
      // } else if (index % 3 === 1) {
      //   return ViewTypes.HALF_LEFT;
      // } else {
      //   return ViewTypes.HALF_RIGHT;
      // }
    },
    (type, dim) => {
      dim.height = height;
      dim.width = width;
      // switch (type) {
      //   case ViewTypes.HALF_LEFT:
      //     dim.width = width / 2;
      //     dim.height = 160;
      //     break;
      //   case ViewTypes.HALF_RIGHT:
      //     dim.width = width / 2 - 0.001;
      //     dim.height = 160;
      //     break;
      //   case ViewTypes.FULL:
      //     dim.width = width;
      //     dim.height = 160;
      //     break;
      //   default:
      //     dim.width = 0;
      //     dim.height = 0;
      // }
    },
  );

const rowRenderer = (type, data) => {
  console.log(data);
  return <VideoPlayer url={data} />;
};

const RenderFooter = ({loading}) =>
  loading && (
    <ActivityIndicator
      style={{margin: 20, alignSelf: 'center', flex: 1}}
      size="large"
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
      this._scrollViewRef.scrollTo(...args);
    }
  }

  render() {
    return (
      <ScrollView
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

export default ListView;

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
