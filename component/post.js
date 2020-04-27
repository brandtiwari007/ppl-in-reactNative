import axios from 'axios';
import React, {useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SinglePost from './singlePostCopmonent';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, Image} from 'react-native';
const PostLoad = props => {
  // console.log('param data', props);

  const [posts, setPosts] = useState([]);
  const [username, setUserName] = useState();
  useEffect(() => {
    fetchData();
    storeData();
    // setPosts([props.route?.params?.current])

    axios.post('http://192.168.43.3:8969/getImage').then(response => {
      setPosts(response.data.reverse());
    });
  }, []);
  useEffect(() => {
    if (props.route.params) {
      let newPost = props.route.params.post;
      console.log(newPost, 'here newPost is  mmm');

      setPosts([newPost, ...posts]);
    }
  }, [props.route.params]);
  useEffect(() => {
    console.log('changin posts');
  }, [posts]);
  const fetchData = async () => {
    try {
      const kea = await AsyncStorage.getItem('username');
      setUserName(kea);
    } catch (err) {}
  };
  const storeData = async () => {
    try {
      _userid = await AsyncStorage.getItem('_userid');
    } catch (err) {}
  };

  return (
    <ScrollView>
      {posts ? (
        <View>
          <Image
            style={{width: 200, height: 100, alignSelf: 'center'}}
            source={{
              uri: 'http://192.168.43.3:8969/uploads/logo.png',
            }}
          />
          {posts.map((value, index) => {
            return (
              <SinglePost post={value} username={username} key={value._id} />
            );
          })}
        </View>
      ) : null}
    </ScrollView>
  );
};
export default PostLoad;
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Button1: {
    width: '30%',
    margin: 5,
  },
});
