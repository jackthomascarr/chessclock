// import the necessary components
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Camera } from "expo-camera";
import { useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


// declare a basic Application
export default function CameraApp({saveData, setSaveData, cameraVisible, setCamera}) {
  // define variables that save information between UI redraws.
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [viewmode, setVMode] = useState(false);
  const isMounted = useRef(null);

  let SnapCamera = null;
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;

  const styles = StyleSheet.create({
    camera: {
      flex: 1,
    },
    container: {
      position:"absolute",
      zIndex: 1,
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor:"black"
      
    },
    cameraRow: {
      flex: 6,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    cameraContainer: {
      flex: 6,
    },
    rotateView: {
      flex: 6,
    },
    snapView: {
      flex: 6,
      justifyContent: "center",
    },
    smallPreview: {
      backgroundColor: "black",
      marginBottom: 5,
      marginRight: 5,
      width: 40,
      height: 40,
    },
  });

  // Ask camera permissions after every redraw.
  useEffect(async () => {
    if (hasPermission !== "granted") {
      isMounted.current = true;
      const {status} = await Camera.requestCameraPermissionsAsync()

      if(isMounted.current === true){
        setHasPermission(status);
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  // if do not have permission to access camera show notice
  if (hasPermission === null || hasPermission === false) {
    var notice = (
      <View style={{ justifyContent: "center" }}>
        <Text>No Access To Camera</Text>
      </View>
    );
    return notice;
  }

  if (SCREEN_WIDTH > SCREEN_HEIGHT) {
  }

  let camui = <Text> Major Failure</Text>;

  // Displays camera view
  camui = (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        prev
        type={type}
        ref={(ref) => (SnapCamera = ref)}
      >
        <View style={styles.cameraContainer}>
          <View style={styles.cameraRow}>
            <View style={styles.rotateView}>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialIcons
                  style={styles.flipIcon}
                  name="flip-camera-ios"
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.snapView}>
              <TouchableOpacity
                onPress={async () => {
                  await snap();
                }}
              >
                <MaterialIcons name="camera" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Camera>
      </SafeAreaView>
    </View>
  );

  // function to take camera picture
  var snap = async () => {
    if (hasPermission) {
      const options = { quality: 0.5, base64: true };
      let photo = await SnapCamera.takePictureAsync(options);

      let saveDataCopy = {...saveData}
      saveDataCopy.photo = photo.uri
     
      setSaveData(saveDataCopy);
      setCamera(false);
    }
  };

  return camui;
}
