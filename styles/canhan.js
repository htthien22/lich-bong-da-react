import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    tren: {
        flex: 1,
        backgroundColor: 'red'
    },
    duoi: {
        flex: 8,
        backgroundColor: 'white'
    },
    dangnhap: {
        width: 80,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 10,
        right: 15
    },
    dangky: {
        width: 80,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 10,
        left: 15
    }
});


export default styles;