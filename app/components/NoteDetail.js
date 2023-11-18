import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../misc/colors';
//import { useHeaderHeight } from '@react-navigation/native-stack';
import { useHeaderHeight } from "@react-navigation/elements";
import RoundBtn from './RoundBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteModal from './NoteModal';
import { useSelectedData } from '../contexts/SelectedDataProvider';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};


const NoteDetail = props => {

   // console.log(props.route);

  // const {note} = props.route.params;
  const [note,setNote] = useState(props.route.params.note);
   const headerHeight = useHeaderHeight();

   const [showModal, setShowModal] = useState(false);
   const [isEdit,setIsEdit] = useState(false);
   const { setNotes} = useNotes();



   const deleteNote = async () => {
   const result = await AsyncStorage.getItem('notes');
   let notes = [];
   if(result !== null) notes = JSON.parse(result);

   const newNotes = notes.filter(n => n.id !== note.id)
   setNotes(newNotes);
   await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
   props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

 const {clientName} = useSelectedData();
  
 
  return (
    <>
    <ScrollView contentContainerStyle={[styles.container,{paddingTop:headerHeight}]}>
    <Text style={styles.time}>
    {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
    </Text>
    <Text>{clientName}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>
    </ScrollView>
      <View style={styles.btnContainer}>
      <RoundBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundBtn antIconName='edit' 
      //  onPress={() => setShowModal(true)}
        onPress={openEditModal} 
        />
      </View>
      <NoteModal
        isEdit={isEdit}
        note={note}
        onModalClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
      </>
  )
}

export default NoteDetail

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

