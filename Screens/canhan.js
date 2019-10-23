import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/canhan';
import login from './login';
import dangky from './dangky';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class Canhan extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.tren}>
                    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../Images/bgrr.jpg')}>
                    </ImageBackground>
                </View>

                <View style={styles.duoi}>
                    <Image style={{ shadowRadius: 20, width: 66, height: 66, borderRadius: 50, left: 20, bottom: 33, }} source={require('../Images/avt.jpg')} />
                    <View style={{ flexDirection: 'row', bottom: 55, left: 150 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={styles.dangnhap}>
                            <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic', textAlign: 'center', top: 10 }}>Đăng Nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('dangky')} style={styles.dangky}>
                            <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic', textAlign: 'center', top: 10 }}>Đăng Ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const MainNavigato = createStackNavigator(
    {
        canhan: {
            screen: Canhan,
            navigationOptions: {
                header: null,
            },
        },
        login: {
            screen: login,
            navigationOptions: {
                title: 'Đăng nhập',
                headerTintColor:'#ff5a66'
            }
        },
        dangky: {
            screen: dangky,
            navigationOptions: {
                title: 'Đăng ký',
                headerTintColor:'#ff5a66'
            }
        }

    },
    {
        initialRouteName: 'canhan',
    },

);

const AppContainer = createAppContainer(MainNavigato);
export default AppContainer;
