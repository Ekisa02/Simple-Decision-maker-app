import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import the separate styles file
import { settingsStyles as styles } from "../assets/styles/Settings.js";

export default function Settings() {
  const router = useRouter();

  // Settings State
  const [personality, setPersonality] = useState("Balanced");
  const [notifications, setNotifications] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  
  // Custom Instructions State
  const [instructions, setInstructions] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Dynamic Theme State (Based on Personality)
  const [themeColors, setThemeColors] = useState(["#111827", "#1a0033"]);

  // Load Settings on Mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Update theme when personality changes
  useEffect(() => {
    switch(personality) {
      case "Strict":
        setThemeColors(["#200505", "#1a0000"]); // Dark Red/Black Theme
        break;
      case "Zen":
        setThemeColors(["#052005", "#001a00"]); // Dark Green/Black Theme
        break;
      default:
        setThemeColors(["#111827", "#1a0033"]); // Default Purple/Blue Theme
    }
  }, [personality]);

  const loadSettings = async () => {
    try {
      const savedPersonality = await AsyncStorage.getItem("ai_personality");
      const savedNotifs = await AsyncStorage.getItem("notifications");
      const savedInstructions = await AsyncStorage.getItem("custom_instructions");
      
      if (savedPersonality) setPersonality(savedPersonality);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
      if (savedInstructions) setInstructions(savedInstructions);
    } catch (e) {
      console.log("Failed to load settings");
    }
  };

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (e) {
      console.log("Failed to save");
    }
  };

  const changePersonality = (type) => {
    setPersonality(type);
    saveSetting("ai_personality", type);
    // Visual feedback
    Alert.alert("Mode Changed", `DeciMate is now in ${type} mode.`);
  };

  const saveInstructions = async () => {
    await saveSetting("custom_instructions", instructions);
    setModalVisible(false);
    Alert.alert("Brain Updated", "DeciMate has learned your new rules!");
  };

  const clearData = async () => {
    Alert.alert(
      "Clear History",
      "Are you sure? This will wipe all your previous decisions from the home screen.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Wipe It", 
          style: "destructive", 
          onPress: async () => {
             try {
                // Remove the specific key used in index.jsx
                await AsyncStorage.removeItem("decision_history");
                Alert.alert("Success", "History wiped clean.");
             } catch(e) {
                console.log(e);
             }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Dynamic Gradient Background based on Personality Mode */}
      <LinearGradient colors={themeColors} style={{flex:1}}>
        <SafeAreaView style={{ flex: 1 }}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* --- SECTION 1: AI BRAIN --- */}
            <Text style={styles.sectionTitle}>AI Personality</Text>
            <View style={styles.sectionContainer}>
              {["Balanced", "Strict", "Zen"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionRow, 
                    personality === type && styles.activeOption
                  ]}
                  onPress={() => changePersonality(type)}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons 
                      name={
                        type === "Strict" ? "robot-angry" : 
                        type === "Zen" ? "meditation" : "scale-balance"
                      } 
                      size={24} 
                      color={personality === type ? "#fff" : "#a78bfa"} 
                    />
                    <Text style={[styles.optionText, personality === type && {color: '#fff', fontWeight: 'bold'}]}>
                      {type} Mode
                    </Text>
                  </View>
                  {personality === type && <Ionicons name="checkmark-circle" size={22} color="#4ade80" />}
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.helperText}>
              {personality === "Strict" ? "Takes no excuses. Focuses purely on productivity." : 
               personality === "Zen" ? "Focuses on mental health and avoiding burnout." : 
               "Attempts to find a healthy middle ground."}
            </Text>

            {/* --- SECTION 2: CUSTOM RULES --- */}
            <Text style={styles.sectionTitle}>Customization</Text>
            <View style={styles.sectionContainer}>
              <TouchableOpacity style={styles.actionRow} onPress={() => setModalVisible(true)}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={{backgroundColor:'rgba(139, 92, 246, 0.2)', padding:8, borderRadius:8}}>
                      <Ionicons name="create-outline" size={20} color="#a78bfa" />
                   </View>
                   <Text style={styles.optionText}>Edit AI Instructions</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>
               Tell the AI about your preferences (e.g., &quot;I hate running,&quot; &quot;I prefer working at night&quot;).
            </Text>

            {/* --- SECTION 3: PREFERENCES --- */}
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.sectionContainer}>
              <View style={styles.switchRow}>
                <Text style={styles.optionText}>Allow Notifications</Text>
                <Switch
                  value={notifications}
                  onValueChange={(val) => {
                    setNotifications(val);
                    saveSetting("notifications", val);
                  }}
                  trackColor={{ false: "#374151", true: "#8b5cf6" }}
                  thumbColor={"#f4f3f4"}
                />
              </View>
              <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.optionText}>Save History</Text>
                <Switch
                  value={saveHistory}
                  onValueChange={(val) => {
                     setSaveHistory(val);
                     saveSetting("save_history_pref", val);
                  }}
                  trackColor={{ false: "#374151", true: "#8b5cf6" }}
                  thumbColor={"#f4f3f4"}
                />
              </View>
            </View>

            {/* --- SECTION 4: DATA --- */}
            <Text style={styles.sectionTitle}>Data & Privacy</Text>
            <View style={[styles.sectionContainer, {borderColor: 'rgba(239, 68, 68, 0.3)'}]}>
              <TouchableOpacity style={styles.actionRow} onPress={clearData}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                   <Ionicons name="trash-outline" size={22} color="#ef4444" />
                   <Text style={[styles.optionText, { color: "#ef4444", fontWeight:'bold' }]}>
                      Clear Decision History
                   </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>DeciMate v1.2.0 • Powered by Gemini 3-Pro</Text>

          </ScrollView>

          {/* --- BEAUTIFUL INSTRUCTION MODAL --- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalOverlay}
            >
              <View style={styles.modalContent}>
                
                <View style={styles.modalIconContainer}>
                   <MaterialCommunityIcons name="brain" size={40} color="#a78bfa" />
                </View>

                <Text style={styles.modalTitle}>Train Your AI</Text>
                <Text style={styles.modalSubtitle}>
                  Add custom rules for the AI to follow. {"\n"}
                  (e.g., &quot;I usually have low energy in the afternoons&quot; or &quot;Prioritize coding over gaming.&quot;)
                </Text>

                <TextInput 
                   style={styles.textArea}
                   multiline
                   placeholder="Type your custom instructions here..."
                   placeholderTextColor="#6b7280"
                   value={instructions}
                   onChangeText={setInstructions}
                />

                <View style={styles.modalButtons}>
                   <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                      <Text style={[styles.btnText, {color: '#ef4444'}]}>Cancel</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.saveButton} onPress={saveInstructions}>
                      <Text style={styles.btnText}>Save Rules</Text>
                   </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>

        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}