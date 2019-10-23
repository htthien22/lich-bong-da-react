import React from 'react';
import { Text, View, Alert, Image, Modal, TextInput, FlatList, TouchableWithoutFeedback, TouchableOpacity, ToastAndroid } from 'react-native';
import styles from '../styles/lichthidau';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
//import Modal from 'react-native-modal';
//import Swipeout from 'react-native-swipeout';



const Config = {
  clientId: '513537285999-jvhkbk5c4uln0kceg421cm7p2uplnk44.apps.googleusercontent.com',
  appId: '1:513537285999:android:b54a1973170ae438a3129a',
  apiKey: 'AIzaSyB3t0YhKXfbvGA--vbtLFRLoyIIJJ0cSio',
  databaseURL: 'https://baitaplon-a2f2f.firebaseio.com',
  storageBucket: 'baitaplon-a2f2f.appspot.com',
  messagingSenderId: '513537285999',
  projectId: 'baitaplon-a2f2f',
};
if (!firebase.apps.length) {
  firebase.initializeApp(Config);
}

const rootRef = firebase.database().ref();
const Match = rootRef.child('matchs');

export default class Lichthidau extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Lịch Thi Đấu',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='md-calendar' size={30} style={{ color: tintColor }} />
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      matchs: [],
      doi1: '',
      doi2: '',
      gio: '',
      ngay: '',
      showDialog: false,
      showDialogedit: false,
      loading: false,
      updatematchs: [],
      edtdoi1: '',
      edtdoi2: '',
      edtgio: '',
      edtngay: '',
      keyupdate:'',
      update: false,
    }
  }



  componentDidMount() {
    Match.on('value', (childSnapshot) => {
      const matchs = [];
      childSnapshot.forEach((doc) => {
        matchs.push({
          key: doc.key,
          doi1: doc.toJSON().doi1,
          doi2: doc.toJSON().doi2,
          gio: doc.toJSON().gio,
          ngay: doc.toJSON().ngay,
        });
        this.setState({
          matchs: matchs.sort((a, b) => {
            return (a.gio > b.gio);
          }),
          loading: false,
        });
      });
    });
  }
  //them dl
  add = () => {

    if (this.state.doi1.trim() === '' || this.state.doi2.trim() === '' || this.state.ngay.trim() === '' || this.state.gio.trim() === '') {
      ToastAndroid.show(
        'Không được bỏ trống!!', ToastAndroid.SHORT);
      return;
    }
    this.setState({ showDialog: false });
    Match.push({
      doi1: this.state.doi1,
      doi2: this.state.doi2,
      gio: this.state.gio,
      ngay: this.state.ngay, 
    })
    ToastAndroid.show(
      'Thêm dữ liệu thành công!!', ToastAndroid.SHORT);
  }

  ///show dialog add
  show = () => {
    this.setState({ showDialog: true });
  };

  //hide  edit
  hideedit = () => {
    this.setState({ showDialogedit: false });
  }
  //hide dialog add
  hide = () => {
    this.setState({ showDialog: false });
  };


  //xoa
  _xoa(key) {
    firebase.database().ref('matchs/' + key).remove();
    ToastAndroid.show('Xóa thành công!', ToastAndroid.SHORT);
  }
  //get edit
  _edit(key) {
    //alert(key);
    this.setState({ showDialogedit: true,keyupdate: key });

    firebase.database().ref('matchs/' + key).once('value').then(data => {
      this.setState({
        edtdoi1: data.val().doi1,
        edtdoi2: data.val().doi2,
        edtgio: data.val().gio,
        edtngay: data.val().ngay
      });
      // console.log(data.val().ngay)
    });
  }
  _editt(){
    const key=this.state.keyupdate;
    firebase.database().ref('matchs/'+key).update({
      doi1:this.state.edtdoi1,
      doi2:this.state.edtdoi2,
      gio:this.state.edtgio,
      ngay:this.state.edtngay,
    });
    this.setState({showDialogedit:false});
    ToastAndroid.show('Cập nhật thành công!',ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={{ flex: 1}}>
          <Modal
            visible={this.state.showDialog}
            transparent={true}
          >
            <View style={styles.viewModal}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', padding: 15, fontSize: 20, fontWeight: 'bold' }}>Thêm Trận Đấu </Text>
                </View>

                <View style={{ flex: 7, flexDirection: 'column' }}>
                  <TextInput
                    placeholder="Nhập tên đội nhà"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ doi1: Text });
                    }} />
                  <TextInput
                    placeholder="Nhập tên đội khách"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ doi2: Text });
                    }} />
                  <TextInput
                    placeholder="Nhập giờ"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ gio: Text });
                    }} />
                  <TextInput
                    placeholder="Nhập ngày"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ ngay: Text });
                    }} />
                </View>

                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ borderRadius: 5, borderShadow: 5, justifyContent: 'center', backgroundColor: 'green', width: 70, height: 40 }}
                    onPress={this.hide}>
                    <Text style={{ color: 'white', left: 15 }}>Trở về</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ borderRadius: 5, left: 60, justifyContent: 'center', backgroundColor: 'green', width: 70, height: 40 }}
                    onPress={this.add}>
                    <Text style={{ color: 'white', left: 15 }}>Thêm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>

          {/* sua item */}
          <Modal
            visible={this.state.showDialogedit}
            transparent={true}
          >
            <View style={styles.viewModal}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', padding: 15, fontSize: 20, fontWeight: 'bold' }}>Sửa Trận Đấu </Text>
                </View>

                <View style={{ flex: 7, flexDirection: 'column' }}>
                  <TextInput
                    placeholder="Nhập tên đội nhà"
                    style={styles.txtDulieu}
                    onChangeText={(Text) => {
                      this.setState({ edtdoi1: Text });
                    }}
                    value={this.state.edtdoi1} />
                  <TextInput
                    placeholder="Nhập tên đội khách"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ edtdoi2: Text });
                    }}
                    value={this.state.edtdoi2} />
                  <TextInput
                    placeholder="Nhập giờ"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ edtgio: Text });
                    }}
                    value={this.state.edtgio} />
                  <TextInput
                    placeholder="Nhập ngày"
                    style={styles.txtDulieu} onChangeText={(Text) => {
                      this.setState({ edtngay: Text });
                    }}
                    value={this.state.edtngay} />
                </View>

                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ borderRadius: 10, borderShadow: 5, justifyContent: 'center', backgroundColor: 'green', width: 80, height: 40 }}
                    onPress={this.hideedit}>
                    <Text style={{ color: 'white', left: 15 }}>Trở về</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { this._editt() }}
                    style={{ borderRadius:10, left: 60, justifyContent: 'center', backgroundColor: 'green', width: 80, height: 40 }}
                    >
                    <Text  style={{ color: 'white', left: 15 }}>Cập nhật</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>
       
        <View>



          {/* danh sach */}
          <FlatList data={this.state.matchs}
            renderItem={({ item }) => {

              return (
                <TouchableWithoutFeedback onPress={() => { this._edit(item.key) }}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', position: 'relative', bottom: 10 }}>
                    <View style={styles.viewItem}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flex: 3, justifyContent: 'center', }}>
                          <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Image style={{ height: 50, width: 50, left: 33 }} source={require('../Images/h.png')} />
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{item.doi1}</Text>
                          </View>
                        </View>

                        <View style={{ flex: 3, justifyContent: 'center', left: 30, bottom: 20 }}>
                          <Text style={{ fontSize: 22, color: '#ff6800' }}>{item.gio}</Text>
                          <Text style={{ fontSize: 15, color: 'black', right: 10 }} >{item.ngay}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                              Alert.alert(
                                'Thông báo',
                                'Bạn có chắc chắn muốn xóa?',
                                [

                                  {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                  { text: 'OK', onPress: () => this._xoa(item.key) },
                                ],
                                { cancelable: false },
                              );
                            }}
                              style={{ top: 20, width: 50, height: 30, justifyContent: 'center' }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image onp style={{ left: 10, width: 40, height: 40 }} source={require('../Images/xoa.png')} />
                              </View>

                            </TouchableOpacity>
                          </View>

                        </View>

                        <View style={{ flex: 3, justifyContent: 'center', }}>
                          <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Image style={{ height: 50, width: 50, left: 33 }} source={require('../Images/k.jpg')} />
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, color: 'gray' }}>{item.doi2}</Text>
                          </View>
                        </View>

                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

              );
            }} >
          </FlatList>
        </View>
        <View style={{ position: 'absolute' }}>
          <TouchableOpacity style={styles.floating} onPress={this.show}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
