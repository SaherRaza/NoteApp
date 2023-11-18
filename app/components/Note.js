import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../misc/colors';
import { useSelectedData } from '../contexts/SelectedDataProvider';

const Note = ({ item, onPress }) => {
  const { title, desc, client } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.textContainer}>
     <Text style={{color:colors.LIGHT}}>{client}</Text>
    </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
  },
  textContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:8
  }
});

export default Note;