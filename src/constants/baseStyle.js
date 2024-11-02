import {  StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
    baseInput :{
        height: 50,
        borderColor:'rgba(17,24,39,0.2)',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 16,
        paddingHorizontal: 12,
    },
    baseContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
      },
    
});

export default baseStyles