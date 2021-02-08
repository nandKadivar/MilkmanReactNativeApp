import React from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground, ScrollView} from 'react-native';
import MapView,{Callout} from 'react-native-maps'
import { region, markers, mapStyle } from '../components/DairyShopData'
import { primaryColor } from '../theme'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ExploreScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* <Text>Explore Screen</Text> */}
            {/* <Map /> */}
            <MapView
                style={StyleSheet.absoluteFillObject}
                loadingEnabled={true}
                customMapStyle={mapStyle}
                region={region}
            >
                {
                    markers.map(x => (
                        <MapView.Marker
                            key={x.id}
                            coordinate={ x.coordinates }
                            image={require('../../assets/images/map_marker.png')}
                        >
                            <Callout tooltip>
                                <View>
                                    <View style={styles.tooltip}>
                                        <Text style={styles.name}>{ x.title}</Text>
                                        <Text style={styles.description}>{ x.description}</Text>
                                    </View>
                                </View>
                            </Callout>
                        </MapView.Marker>
                    ))
                }
            </MapView>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollview}
            >
                {/* <TouchableOpacity> */}
                    {
                        markers.map((x) => (
                            <View style={styles.cardContainer} key={x.id}>
                                <View style={styles.cardImageContainer}>
                                    <Image style={styles.cardImage} resizeMode='cover' source={require('../../assets/images/dairyshop.jpg')} />
                                </View>
                                <View style={styles.cardTextContainer}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>{ x.title}</Text>
                                    <Text style={styles.cardDescription}>{ x.description}</Text>
                                </View>
                            </View>
                        ))
                    }
                {/* </TouchableOpacity> */}
            </ScrollView>
        </View>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tooltip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    },
    scrollview: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    cardContainer: {
        backgroundColor: '#fff',
        // marginTop: height/1.41,
        elevation: 1.5,
        borderRadius: 5,
        marginHorizontal: 10,
        height: height / 4,
        width: width / 1.1,
        overflow: 'hidden'
    },
    cardImageContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: '#000'
    },
    cardImage: {
        // flex: 3,
        width: '100%',
        height: '100%',
        // alignItems: 'center'
    },
    cardTextContainer: {
        // flex: 2,
        padding: 10
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: 12,
        color: '#9D9D9D'
    }
  });