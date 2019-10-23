import { StyleSheet } from 'react-native'
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    p1: {
        flex: 3,
        flexDirection: 'column',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    p2: {
        flex: 7,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    img: {
        width: 80,
        height: 80,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 20,
        color: '#ffa611'

    },
    InputContainer: {
        marginTop: 10,
        borderRadius: 7,
        justifyContent: 'space-between',
        backgroundColor: 'green',
    },
    tdn: {
        width: 300,
        height: 50,
    },
    textform: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 12,

    },
    btnlogin: {
        marginTop: 15,
        backgroundColor: 'rgb(0, 158, 219)',
        width: 300,
        height: 50,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textlogin: {
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 15,
    },
    hoac: {
        marginTop: 15,
        color: 'green',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSize: 12,
    },
});
export default style;