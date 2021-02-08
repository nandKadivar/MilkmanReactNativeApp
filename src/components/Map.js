import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import MapView,{Callout} from 'react-native-maps'
import { primaryColor } from '../theme'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
]
  
const response = [
    {
        id: 1,
        coordinates: {
            latitude: 22.2945269,
            longitude: 70.7876014
        },
        title: 'Title1',
        description: 'Description1',
        icon: ''
    },
    {
        id: 2,
        coordinates: {
            latitude: 22.3045269,
            longitude: 70.7976014
        },
        title: 'Title2',
        description: 'Description2',
        icon: ''
    },
    {
        id: 3,
        coordinates: {
            latitude: 22.3145269,
            longitude: 70.7876014
        },
        title: 'Title3',
        description: 'Description3',
        icon: ''
    },
    {
        id: 4,
        coordinates: {
            latitude: 22.3149269,
            longitude: 70.7976014
        },
        title: 'Title4',
        description: 'Description4',
        icon: ''
    },
    {
        id: 4,
        coordinates: {
            latitude: 22.302277,
            longitude: 70.798115
        },
        title: 'Title4',
        description: 'Description4',
        icon: ''
    },
    {
        id: 5,
        coordinates: {
            latitude: 22.298549,
            longitude: 70.793271
        },
        title: 'Title5',
        description: 'Description5',
        icon: ''
    },
    {
        id: 6,
        coordinates: {
            latitude: 22.298221,
            longitude:  70.797874
        },
        title: 'Title6',
        description: 'Description6',
        icon: ''
    }
]

const Map = () => {
    return (
        <MapView
            style={StyleSheet.absoluteFillObject}
            loadingEnabled={true}
            customMapStyle={mapStyle}
            region={{
                latitude: 22.2945269,
                longitude: 70.7876014,
                latitudeDelta: 0.01,
                longitudeDelta: 0.05
            }}
        >
            {
                response.map(x => (
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
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        height,
        width
    },
    tooltip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    }
  });