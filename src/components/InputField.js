import React from 'react'
import { View,TextInput, StyleSheet, Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputField = ({icon,iconSize, placeholder, secureTextEntry, onChangeText}) => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <FontAwesome name={icon} size={Number(iconSize)} color="#0059D4" />
            </View>
            {secureTextEntry == 'true' ?
                    <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={true} onChangeText={onChangeText} />
                :
                    <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} />
            }
        </View>
    )
}

InputField.defaultProps = {
    iconSize: 18
}

export default InputField

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: windowHeight/15,
        borderWidth: 0,
        borderRadius: 5,
        borderColor: '#ececec',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1.5
    },
    icon: {
        padding: 5,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ececec',
        borderRightWidth: 0,
        width: 45,
    },
    input: {
        padding: 7,
        flex: 1,
        fontSize: 16,
        // fontFamily: 'Lato-Regular',
        color: '#0059D4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    }
})
