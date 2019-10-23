import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, Alert, Image, Modal, TextInput, FlatList, TouchableWithoutFeedback, TouchableOpacity, ToastAndroid } from 'react-native';
import styles from '../styles/ketqua';
import firebase from 'react-native-firebase';



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

export default class Ketqua extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Kết quả',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='md-list-box' size={30} style={{ color: tintColor }} />
        }
    }



    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
            refreshing: false,
            doi1: '',
            doi2: '',
            trangthai: '',
            ketqua: '',
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
                    trangthai: doc.toJSON().trangthai,
                    ketqua: doc.toJSON().ketqua,
                });
                if (doc.toJSON.trangthai != '') {
                    this.setState({
                        matchs: matchs,
                        loading: false,
                    });
                }

            });
        });
    }


    render() {
        return (
            <View style={{ flex: 1 }}>

                {/* ketqua */}
                <FlatList data={this.state.matchs}
                    renderItem={({ item }) => {
                        if (item.ketqua != null) {
                            return (

                                <TouchableWithoutFeedback onPress={() => { ToastAndroid.show('key:' + item.key, ToastAndroid.LONG) }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative', bottom: 10 }}>
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
                                                    <Text style={{ fontSize: 15, color: 'green', left: 18 }}>{item.trangthai}</Text>
                                                    <Text style={{ fontSize: 35, fontStyle: 'normal', fontWeight: 'bold', color: '#ff6800', top: 10 }} >{item.ketqua}</Text>
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
                        }
                    }} >
                </FlatList>
                <View>
                </View>
            </View>
        );
    }
}
