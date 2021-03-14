import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { List } from 'react-native-paper';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground} from 'react-native';
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AdminCustomersScreen = () => {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.mainContainer}>
                {/* <ScrollView style={styles.customerScrollView}>
                    <List.Section style={styles.Accordion} title="Accordions">
                        <List.Accordion
                            title="Uncontrolled Accordion"
                            left={props => <List.Icon {...props} icon="folder" />}>
                            <List.Item title="First item" />
                            <List.Item title="Second item" />
                        </List.Accordion>

                        <List.Accordion
                            title="Controlled Accordion"
                            left={props => <List.Icon {...props} icon="folder" />}
                            expanded={expanded}
                            onPress={handlePress}>
                            <List.Item title="First item" />
                            <List.Item title="Second item" />
                        </List.Accordion>
                    </List.Section>
                </ScrollView> */}
            </View>
        </View>
    )
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
        height: windowHeight / 3.5,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    customerScrollView: {
        width: windowWidth/0.8,
    },
    Accordion: {
        width: '100%',
    }
});