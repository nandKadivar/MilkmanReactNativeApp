import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

const Rating = ({value,text,color}) => {
    return (
        <View style={styles.rating}>
            <View>
                <FontAwesome color={color} size={16} style={styles.star} name={value>=1 ? 'star' : value>=0.5 ? 'star-half' : 'star'} />
            </View>
            <View>
                <FontAwesome color={color} size={16} style={styles.star} name={value>=2 ? 'star' : value>=1.5 ? 'star-half' : 'star'} />
            </View>
            <View>
                <FontAwesome color={color} size={16} style={styles.star} name={value>=3 ? 'star' : value>=2.5 ? 'star-half' : 'star'} />
            </View>
            <View>
                <FontAwesome color={color} size={16} style={styles.star} name={value>=4 ? 'star' : value>=3.5 ? 'star-half' : 'star'} />
            </View>
            <View>
                <FontAwesome color={color} size={16} style={styles.star} name={value>=5 ? 'star' : value>=4.5 ? 'star-half' : 'star'} />
            </View>
            <Text style={styles.text}> { text && text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    star: {
        margin: 1,
    },
    text: {
        fontSize: 14
    }
})

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

Rating.defaultProps = {
    color: '#f8e825'
}

export default Rating
