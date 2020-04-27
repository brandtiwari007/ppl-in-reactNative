import axios from 'axios';
import React, {useState} from 'react';
import moment from 'moment';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  // ScrollView,
  Button,
  Image,
} from 'react-native';
const SinglePost = props => {
  const [hide, setHide] = useState(false);
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 12) / 16);
  const imageWidth = dimensions.width - 2;
  const [post, setPost] = useState(props.post);
  const [comment, setComment] = useState();

  return (
    <View style={{borderColor: 'green', borderWidth: 2}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 100 / 2,
            }}
            source={{
              uri: 'http://192.168.43.3:8969/uploads/t.jpeg',
            }}
          />

          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 25}}>{post.username}</Text>

            <Text style={{}}>{post.title}</Text>
          </View>
        </View>
        <View>
          <Text styles={{flex: 1, flexWrap: 'Wrap'}}>{post.category}</Text>

          <Text>
            {moment(post.date)
              .utcOffset('+05:30')
              .startOf('hours')
              .fromNow()}
          </Text>
        </View>
      </View>

      <Image
        style={{
          width: imageWidth,
          height: imageHeight,
          alignSelf: 'center',
        }}
        source={{
          uri: 'http://192.168.43.3:8969/uploads/' + post.image,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View>
          {/* <Text>Like</Text> */}
          <Button
            title={'Likes ' + post.likes.length}
            onPress={() => {
              axios
                .post('http://192.168.43.3:8969/likes', {
                  _userid: _userid,
                  _id: post._id,
                })
                .then(response => {
                  setPost(response.data);
                });
            }}
          />
        </View>

        <View>
          {/* <Text>Coment</Text> */}

          <Button
            title={'comment ' + post.comment.length}
            color="red"
            onPress={() => (hide ? setHide(false) : setHide(true))}
          />
        </View>

        <View>
          {/* <Text>Share</Text> */}
          <Button title="share" />
        </View>
      </View>
      {hide
        ? post.comment.map((value, index) => {
            return (
              <View key={index}>
                <TextInput>{value.username}</TextInput>
                <Text>{value.comment}</Text>

                <Text />
                <TextInput />
              </View>
            );
          })
        : null}
      {hide && (
        <View style={{paddingHorizontal: 5, flexDirection: 'row'}}>
          <TextInput
            style={{flex: 1}}
            placeholder="enter comment"
            onChangeText={text => {
              setComment(text);
            }}
          />
          <Button
            disabled={comment?.length ? false : true}
            title="POST"
            onPress={() => {
              comment?.length &&
                axios
                  .post('http://192.168.43.3:8969/comment', {
                    comment: comment,
                    username: props.username,
                    _id: post._id,
                  })
                  .then(response => {
                    setPost(response.data);
                    setHide(false);
                  });
            }}
          />
        </View>
      )}
    </View>
  );
};
export default SinglePost;
