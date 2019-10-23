import React, { Component } from 'react';
import { Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native';
import make from '../styles/login';
export default class dangky extends Component {

    render() {
        return (
            <View style={make.container}>
                <View style={make.p1}>
                     <Image style={{width:56,height:56}} source={require('../Images/vn.jpg')}/>   
                    <Text style={make.title}>Welcome To My Application</Text>
                </View>
                <View style={make.p2}>
                    <Text style={make.textform}>Tên đăng nhập</Text>
                    <View style={make.InputContainer}>
                        <TextInput placeholder=" Tên đăng nhập " style={make.tdn}></TextInput>
                    </View>
                    <Text style={make.textform}> Mật khẩu </Text>
                    <View style={make.InputContainer}>
                        <TextInput placeholder=" ****** " secureTextEntry={true} style={make.tdn}></TextInput>
                    </View>
                    <Text style={make.textform}> Nhập lại mật khẩu </Text>
                    <View style={make.InputContainer}>
                        <TextInput placeholder=" ****** " secureTextEntry={true} style={make.tdn}></TextInput>
                    </View>
                    <TouchableOpacity style={make.btnlogin}>
                        <Text style={make.textlogin}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                    <Text style={make.hoac}> Hoặc </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('login')} style={make.btnlogin}>
                        <Text style={make.textlogin}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}