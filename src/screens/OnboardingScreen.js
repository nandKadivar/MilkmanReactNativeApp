import React from 'react'
import { StyleSheet, View,Text, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import MapLogo from './../../assets/logo/MapLogo'
import SupplierLogo from './../../assets/logo/SupplierLogo'
import PaymentLogo from './../../assets/logo/PaymentLogo'

const Dots = ({selected}) => {
    let bgcolor;
    bgcolor = selected ? '#45489a' : '#fff';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor: bgcolor
            }}
        />
    );
}

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            onSkip={() => navigation.replace("Landing")}
            onDone={() => navigation.navigate("Landing")}
            // DotComponent={Dots}
            pages={[
                {
                    // backgroundColor: '#fff',
                    // backgroundColor: '#FE374A',
                    backgroundColor: '#F4495C',
                    // backgroundColor: '#A6E4D0',
                    image: <MapLogo />,
                    title: "Add location",
                    subtitle: 'Find all milk suppliers of your town on one click'
                },
                {
                    // backgroundColor: '#fff',
                    // backgroundColor: '#02D892',
                    backgroundColor: '#2A2D4E',
                    // backgroundColor: '#6C72B7',
                    // backgroundColor: '#19456b',
                    // backgroundColor: '#FDEB93',
                    image: <SupplierLogo />,
                    title: 'Select supplier',
                    subtitle: 'Compare supplier based on reviews and prize'
                },
                {
                    // backgroundColor: '#fff',
                    // backgroundColor: '#006BFF',
                    backgroundColor: '#006BFF',
                    // backgroundColor: '#E9BCBE',
                    image: <PaymentLogo />,
                    title: 'Easy billing',
                    subtitle: 'Pay your bill online at the end of the month'
                },
            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });