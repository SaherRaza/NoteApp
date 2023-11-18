import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../misc/colors";
import RoundBtn from "./RoundBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelectedData } from "../contexts/SelectedDataProvider";
import { FontAwesome } from "@expo/vector-icons";

const NoteModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const [clientList, setClientList] = useState("");
  const [selectClient, setSelectClient] = useState("");

  const getClient = async () => {
    const name = await AsyncStorage.getItem("clientList");
    setClientList(JSON.parse(name));
  };

  const handleSelectClient = async(client) => {
   await AsyncStorage.setItem("selectedClient", JSON.stringify(client));
    setSelectClient(client);
    setClientModalVisible(false);
  };
  console.log(selectClient);


  useEffect(() => {
    getClient();
   
  }, []);

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim() && !selectClient.trim())  return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now(), selectClient);
    } else {
      onSubmit(title, desc, selectClient);
      setTitle("");
      setDesc("");
      setSelectClient("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          {/* <Text>{text}</Text> */}
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setClientModalVisible(true)}
          >
            <Text style={styles.text}>{selectClient || "Select Client"}</Text>
            <FontAwesome name="chevron-down" size={18} color={colors.PRIMARY} />
          </TouchableOpacity>
          <Modal visible={clientModalVisible} transparent animationType="slide">
            <TouchableWithoutFeedback
              onPress={() => setClientModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                  <FlatList
                    data={clientList} // Ensure 'client' data is correct
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelectClient(item)}
                      >
                        <Text style={styles.modalItem}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <TextInput
            value={title}
            onChangeText={(text) => handleOnChangeText(text, "title")}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder="Note"
            style={[styles.input, styles.desc]}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />
          <View style={styles.btnContainer}>
            <RoundBtn size={15} antIconName="check" onPress={handleSubmit} />
            {title.trim() || desc.trim() ? (
              <RoundBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
    color: colors.PRIMARY,
  },
  arrow: {
    fontSize: 16,
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },

  modalView: {
    backgroundColor: "white",
    padding: 50,
    borderRadius: 10,
    height: 300,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default NoteModal;
