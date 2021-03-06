import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ChatList from "../../components/ChatScreenComponents/ChatList";
import {
  FAB,
  Portal,
  Dialog,
  Paragraph,
  Button,
  TextInput,
} from "react-native-paper";
import { useSelector } from "react-redux";
import firebase from "../../database/firebase";
import { useNavigation } from "@react-navigation/core";

const ChatScreen = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [otherUserEmail, setOtherUserEmail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { email } = useSelector((store) => store);
  const navigation = useNavigation();

  const createChat = async () => {
    if (email) {
      setIsLoading(true);
      const response = await firebase.firebase
        .firestore()
        .collection("chats")
        .add({
          users: [email, otherUserEmail],
        });
      setIsLoading(false);
      setIsDialogVisible(false);
      setOtherUserEmail(undefined);
      navigation.navigate("ChatDetail", { chatId: response.id });
    }
  };
  return (
    <View style={{ flex: 1, marginTop:20 }}>
      <ChatList email={email} />

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => {
            setIsDialogVisible(false);
          }}
        >
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter user email"
              value={otherUserEmail}
              onChangeText={(text) => setOtherUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setIsDialogVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                createChat();
              }}
              isLoading={isLoading}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          marginBottom: 66,
          backgroundColor:'black'
        }}
        icon="plus"
        onPress={() => {
          setIsDialogVisible(true);
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
