import React,{Component} from 'react'
import {StyleSheet ,View, Text} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../actions/index'
import HomeScreen from './HomeScreen'
import ExploreScreen from './ExploreScreen'
import PaymentScreen from './PaymentScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {primaryColor} from '../theme'
const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props
        
        if (currentUser == undefined) {
            return (
                <View></View>
            )
        }
        return (
            // <View style={styles.container}>
            //     <Text>Home Screen { currentUser.email}</Text>
            // </View>
            <Tab.Navigator tabBarOptions={{activeTintColor: primaryColor, inactiveTintColor: 'gray'}}>
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="home" color={color} size={26}/>)}} />
                <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="wpexplorer" color={color} size={26}/>)}} />
                <Tab.Screen name="Payment" component={PaymentScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="credit-card" color={color} size={26}/>)}} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps,mapDispatchProps)(Main)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

// const HomeScreen = (props) => {
//     useEffect(() => {
//         fetchUser();
//     })

//     // const { currentUser } = props
//     // console.log(currentUser)
    
//     return (
//         <View style={styles.container}>
//             <Text>Home Screen {currentUser.name }</Text>
//         </View>
//     )
// }

// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser
// })
// const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser},dispatch)

// export default connect(mapStateToProps, mapDispatchProps)(HomeScreen)

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
// });