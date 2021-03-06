import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../../database/firebase";
import { useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";

const AddPostScreen = () => {
  const [postText, setPostText] = useState(undefined);

  const reduxState = useSelector((store) => {
    //redux store'daki bilgileri cekiyoruz
    return {
      store,
    };
  });

  const { email, displayName, uid } = reduxState.store;

  const createPost = async () => {
    if (postText) {
      const date = new Date().toISOString();
      try {
        const response = await firebase.firebase
          .firestore()
          .collection("posts")
          .add({
            uid,
            postText,
            displayName,
            date,
            email
          });
        alert("Post Sended.");
        setPostText(null);
      } catch (error) {
        alert(error);
        setPostText(null);
      }
    } else {
      alert("You should write something");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../../assets/background/bg.jpg")}
          style={styles.avatar}
        ></Image>
        <TextInput
          autoFocus={true}
          style={{ flex: 1, backgroundColor:"#FFFFFF", }}
          placeholder="Want to share something?"
          value={postText}
          onChangeText={(text) => setPostText(text)}
        />
      </View>
      <View style={{flex:1,alignItems:'center'}}>
        <TouchableOpacity onPress={createPost}>
          <Button>Post</Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
