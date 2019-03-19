import React from 'react';
import { StyleSheet, View,Button } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.cardWrapper}>
      {props.children}
      <View style={styles.buttonWrapper}>
         <Button color='#E87B79' title='tamamlandı' />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    height: 80,
    margin: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#dddddd',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    fontSize: 10,
    alignItems: 'flex-end',

  },
});

export { Card };
