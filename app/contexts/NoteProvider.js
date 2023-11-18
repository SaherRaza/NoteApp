import { StyleSheet, Text, View } from 'react-native'
import React, {useState, createContext, useEffect, useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext();

const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    

    const findNotes = async() =>{
        const result = await AsyncStorage.getItem("notes");
        console.log(result);
        if(result !== null ) 
        //setNotes(JSON.stringify(result));
        setNotes(JSON.parse(result)); 
      }

      useEffect(() => {
        findNotes();
      //  AsyncStorage.clear();
      }, [])
  
  return (
    <NoteContext.Provider value={{notes, setNotes, findNotes}}>
        {children}
    </NoteContext.Provider>
  )
}

export default NoteProvider

export const useNotes = () => useContext(NoteContext)

const styles = StyleSheet.create({})

