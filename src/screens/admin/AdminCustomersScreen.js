import React,{useEffect} from 'react'
import { SafeAreaView } from 'react-navigation'
import { List } from 'react-native-paper';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import { getSubscriptions } from '../../actions/userActions'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AdminCustomersScreen = ({navigation}) => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    const dispatch = useDispatch()
    const { subscriptionsLoading, subscriptions } = useSelector(state => state.subscriptions)
    console.log(subscriptions)

    useEffect(() => {
        dispatch(getSubscriptions())
    }, [dispatch])

    const customerCard = ({ item }) => {
        return (
            <TouchableOpacity style={styles.customerCard} onPress={()=>navigation.navigate('customerDetails',{item})}>
                <View style={styles.row}>
                    {/* <Text style={styles.customerCardText}>Name: </Text> */}
                    <View style={styles.avatar}>
                        <Text style={{ color: '#fff', fontSize: 24, textTransform: 'uppercase' }}>{String(item.customerName)[0]}</Text>
                    </View>
                    <View style={{flexDirection: 'column',marginLeft: 15}}>
                        <Text style={styles.customerCardText}>{ item.customerName}</Text>
                        <Text style={styles.customerCardSubtext}>{ item.customerEmail}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    if (subscriptionsLoading == true) {
        return (    
            <View style={{flex: 1,backgroundColor: '#f7f7f7',alignItems: 'center',justifyContent: 'center'}}>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        if (subscriptions.length > 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.count}>0{subscriptions.length}</Text>
                        <Text style={styles.headerText}>Customers</Text>
                    </View>
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            {
                                subscriptionsLoading == false && (
                                    <FlatList
                                        data={subscriptions}
                                        renderItem={customerCard}
                                        keyExtractor={item => item.id}
                                    />
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            )
            
        } else {
            return (
                <View style={{flex: 1,backgroundColor: '#f7f7f7',alignItems: 'center',justifyContent: 'center'}}>
                    <Text>No customers</Text>
                </View>
            )
        }
    }
}

export default AdminCustomersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        backgroundColor: primaryColor,
        height: windowHeight / 3.6,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        width: windowWidth,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    count: {
        fontSize: 32,
        color: '#fff'
    },
    headerText: {
        fontSize: 24,
        color: '#fff'
    },
    customerCard: {
        width: windowWidth / 1.05,
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    customerCardText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    customerCardSubtext: {
        fontSize: 14
    },
    avatar: {
        backgroundColor: primaryColor,
        width: 42,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});