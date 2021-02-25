import React from 'react';
import {View,StyleSheet} from 'react-native'
import {primaryColor} from '../theme'

const donutSpinner = props =>
  <View style={styles.loadingSpinner} style={{ ...props.style }}></View>;

export default donutSpinner;

const styles = StyleSheet.create({
    loadingSpinner: {
        display: 'inline-block',
        borderWidth: 4,
        borderColor: primaryColor,
        borderRadius: '50%',
        width: 30,
        height: 30
    }
})