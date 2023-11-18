import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LaunchScreen from "./app/screens/LaunchScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import NoteScreen from "./app/screens/NoteScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteDetail from "./app/components/NoteDetail";
import NoteProvider from "./app/contexts/NoteProvider";
import NoteModal from "./app/components/NoteModal";
import { SelectedDataProvider } from "./app/contexts/SelectedDataProvider";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    // if (result !== null) {
    //   setUser(JSON.parse(result));
    // }
    if (result === null) return setIsAppFirstTimeOpen(true);
   // if not then, 
    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
    //AsyncStorage.clear();
  }, []);

 // if (!user.name) return <LaunchScreen onFinish={findUser} />;
 if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  return (
    <NavigationContainer>
    <SelectedDataProvider>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: "", headerTransparent: true }}
        >
          <Stack.Screen name="NoteScreen" component={RenderNoteScreen} />
          <Stack.Screen name="NoteDetail" component={NoteDetail} />
          <Stack.Screen name="NoteModal" component={NoteModal} />
        </Stack.Navigator>
      </NoteProvider>
    </SelectedDataProvider>
  </NavigationContainer>
  );
  // <NoteScreen user={user} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
