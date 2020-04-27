import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {useState,useRef} from 'react';
import DropdownMenu from 'react-native-dropdown-menu';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from 'react-native';

const UploadPost = props => {
  const [username, setUserName] = useState();
  const [photo, setPhoto] = useState();
  const [userdetail, setUserDetail] = useState({
    title: '',
    category: '',
  });
  //  const [category, setCategory] = useState();
  const fetchData = async () => {
    try {
      console.log('hello2');
      const kea = await AsyncStorage.getItem('username');
      console.log('in kea', kea);
      setUserName(kea);
    } catch (err) {}
  };
  useEffect(() => {
    console.log('hello');
    //  AsyncStorage.getItem('username').then ((response)=>{
    //         console.log("ssync",response)
    //  })

    fetchData();
  }, []);
  const handleChoosePhoto = () => {
    const options = {noData: true};
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        setPhoto(response);
      }
    });
  };
  const submit = () => {
    let image = {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    };
    console.log(image);

    if (userdetail.title && userdetail.category && photo) {
      let formData = new FormData();
      formData.append('image', image);
      formData.append('title', userdetail.title);
      formData.append('category', userdetail.category);
      formData.append('username', username);

      axios
        .post('http://192.168.43.3:8969/upload', formData)
        .then(response => {
          // props.navigation.setParams('home', {
          //   post: response.data,
          // });
            // console.log("response here",response)
            // const ref=useRef(response)

          // props.navigation.navigate('home');

            
          props.navigation.navigate('home', {post: response.data});
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert('all data required');
      return false;
    }
  };
  //  var data = [['latestFirst', 'oldestFirst', 'mostLikes', 'mostComment']];
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 100, alignSelf: 'center'}}
          source={{
            uri: 'http://192.168.43.3:8969/uploads/logo.png',
          }}
        />

        <Text>Category</Text>

        <TextInput
          onChangeText={category =>
            setUserDetail({...userdetail, category: category})
          }
          style={styles.input}
          placeholder="Enter Category"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
        />
        <Text>Title</Text>
        <TextInput
          onChangeText={title => setUserDetail({...userdetail, title: title})}
          style={styles.input}
          placeholder="Enter Title"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          // value={userdetail.lastname}
        />
        {/* <DropdownMenu
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          handler={(selection, row) => setCategory(data[selection][row])}
          data={data}> */}
        <View>
          {photo && (
            <Image
              style={{width: 200, height: 100, alignSelf: 'center'}}
              source={{
                uri: photo.uri,
              }}
            />
          )}

          <View style={{margin: 10}}>
            <Button title="choose photo" onPress={handleChoosePhoto} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Button
              // style={styles.submitButton}

              onPress={submit}
              title="submit"
            />
          </View>
        </View>
        {/* </DropdownMenu> */}
      </View>
    </ScrollView>
  );
};
export default UploadPost;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});

// import React from 'react';
// import {
//   Image,
//   ScrollView,
//   Picker,
//   TextInput,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// //import * as storage from '../Utils/AsyncStorage';
// //import {callApi, config} from '../Utils';

// const {ROUTES} = config;
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;
// export default class UploadPost extends React.Component {
//   state = {
//     Source: null,
//     title: '',
//     categoryId: '',
//     error: {},
//     categoryArr: [],
//   };

//   constructor(props) {
//     super(props);
//     this.titleRef = React.createRef();
//   }
//   defaultCategory = () => {
//     callApi({url: ROUTES.DEFAULT_CATEGORY}).then(response => {
//       // console.log('Default Category Response -----------', response.data);
//       //let c_status = response.data.status;
//       const categoryArr = response.data.dataFromDatabase;
//       // console.log("Default Catta",categoryArr)
//       this.setState({categoryArr: [...categoryArr]});
//       //console.log("categories----", this.state.categoryArr);
//     });
//     // this.setState({ count: false });
//   };

//   uploadPost = async () => {
//     let Id = await storage.get('Id');
//     let {title, response, categoryId} = this.state;

//     if (title === '') {
//       this.setState({
//         error: {title: 'This field is reqired'},
//       });
//       this.titleRef.current.focus();
//     }
//     //console.log('this ', this.state.response);
//     else {
//       if (response === undefined) {
//         this.setState({error: {image: 'This field is required'}});
//       } else {
//         const fd = new FormData();
//         fd.append('author', Id);
//         fd.append('title', title);
//         let cat = categoryId;
//         fd.append('categoryId', cat);
//         fd.append('selectedFiles', {
//           uri: response.uri,
//           type: response.type,
//           name: response.fileName,
//         });
//         callApi({method: 'POST', url: ROUTES.UPLOAD_POST, data: fd}).then(
//           response => {
//             //console.log('Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', response);
//             if (response.data.status === 'Profile Inserted') {
//               this.props.navigation.navigate('Timeline');
//             }
//           },
//         );
//       }
//     }
//   };
//   selectPhotoTapped = () => {
//     const options = {
//       noData: true,
//       mediaType: 'photo',
//     };

//     ImagePicker.showImagePicker(options, response => {
//       // console.log('Response = >>>>>>>>>>>>>>>', response);

//       if (response.didCancel) {
//         // console.log('User cancelled photo picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         // console.log('User tapped custom button: ', response.customButton);
//       } else {
//         let source = {uri: response.uri};

//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//         this.setState({response});
//         this.setState({
//           Source: source,
//         });
//       }
//     });
//   };
//   componentDidMount() {
//     this.defaultCategory();
//   }

//   render() {
//     return (
//       <ScrollView style={{backgroundColor: 'black'}}>
//         <View style={styles.container}>
//           <View>
//             <Text
//               style={{
//                 color: '#ffa21d',
//                 marginTop: 5,
//                 fontSize: 50,
//                 fontFamily: 'vincHand',
//               }}>
//               Upload Post
//             </Text>
//             <TextInput
//               style={styles.input}
//               // keyboardType="email-address"
//               placeholder="Enter the title"
//               placeholderTextColor="white"
//               ref={this.titleRef}
//               onChangeText={text => {
//                 // this.state =
//                 this.setState(previousState => {
//                   return {
//                     title: text,
//                     error: {title: ''},
//                   };
//                 });
//               }}
//               //value={this.state.email}
//             />
//             {this.state.error.title ? (
//               <Text style={{color: 'red'}}>{this.state.error.title}</Text>
//             ) : null}
//             <Text
//               style={{
//                 color: 'white',
//                 marginTop: 10,
//                 fontSize: 20,
//                 fontFamily: 'vincHand',
//               }}>
//               Please Select Category
//             </Text>
//             <Picker
//               selectedValue={this.state.categoryId}
//               style={{
//                 height: 50,
//                 width: 200,
//                 color: 'white',
//                 marginVertical: 5,
//                 backgroundColor: 'rgba(255,255,255,0.15)',
//               }}
//               itemStyle={{fontSize: 20}}
//               onValueChange={(itemValue, itemIndex) =>
//                 this.setState({categoryId: itemValue})
//               }>
//               {this.state.categoryArr.length > 0
//                 ? this.state.categoryArr.map(data => {
//                     return (
//                       <Picker.Item
//                         key={data._id}
//                         label={data.category}
//                         value={data._id}
//                       />
//                     );
//                   })
//                 : null}
//             </Picker>
//             {/* <TextInput
//             style={styles.input}
//             placeholder="Enter the category "
//             placeholderTextColor="black"
//             onChangeText={text => {
//               // this.state =
//               this.setState(previousState => {
//                 return {
//                   category: text,
//                 };
//               });
//             }}
//           /> */}
//           </View>
//           <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
//             <View
//               style={[
//                 styles.avatar,
//                 styles.avatarContainer,
//                 {marginBottom: 20},
//               ]}>
//               {this.state.Source === null ? (
//                 <Text>Select a Photo</Text>
//               ) : (
//                 <Image style={styles.avatar} source={this.state.Source} />
//               )}
//             </View>
//           </TouchableOpacity>
//           {this.state.error.image ? (
//             <Text style={{color: 'red'}}>{this.state.error.image}</Text>
//           ) : null}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => this.uploadPost()}>
//             <Text>Upload </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#ffa21d',
//     padding: 10,
//     width: 150,
//     borderRadius: 20,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,1)',
//   },
//   avatarContainer: {
//     borderColor: '#ffa21d',
//     borderRadius: 20,
//     borderWidth: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: screenWidth * 0.9,
//     padding: 10,
//     height: screenHeight * 0.5,
//   },
//   input: {
//     fontSize: 30,
//     borderBottomWidth: 2,
//     borderBottomColor: '#ffa21d',
//     color: 'white',
//     fontFamily: 'vincHand',
//   },
// });
