import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
import ConfettiCannon from 'react-native-confetti-cannon';
import { SafeAreaView } from "react-native-safe-area-context";

// Import the separate styles file
import { settingsStyles as styles } from "../assets/styles/Settings.js";

export default function Settings() {
  const router = useRouter();
  const confettiRef = useRef(null);

  // Settings State
  const [personality, setPersonality] = useState("Balanced");
  const [notifications, setNotifications] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  
  // Stats State
  const [totalDecisions, setTotalDecisions] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  
  // Custom Instructions State
  const [instructions, setInstructions] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Theme & Easter Egg
  const [themeColors, setThemeColors] = useState(["#111827", "#1a0033"]);
  const [eggCount, setEggCount] = useState(0);

  // Load Settings on Mount
  useEffect(() => {
    loadSettings();
    calculateStats();
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

  const calculateStats = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("decision_history");
      if (storedHistory) {
        const history = JSON.parse(storedHistory);
        const count = history.length;
        setTotalDecisions(count);
        // Estimate 2 minutes saved per decision
        setTimeSaved(count * 2);
      }
    } catch(e) { console.log(e); }
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
    Alert.alert("Mode Changed", `DeciMate is now in ${type} mode.`);
  };

  const saveInstructions = async () => {
    await saveSetting("custom_instructions", instructions);
    setModalVisible(false);
    Alert.alert("Brain Updated", "DeciMate has learned your new rules!");
  };

  const clearData = async () => {
    Alert.alert(
      "Clear Decision History",
      "Are you sure you want to clear all your saved decision history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear History", 
          style: "destructive", 
          onPress: async () => {
             try {
                await AsyncStorage.removeItem("decision_history");
                setTotalDecisions(0);
                setTimeSaved(0);
                Alert.alert("Success", "Decision history has been cleared successfully!");
             } catch(e) {
                console.log(e);
                Alert.alert("Error", "Could not clear history.");
             }
          } 
        }
      ],
      { cancelable: true }
    );
  };

  // Easter Egg Function
  const handleEasterEgg = () => {
    setEggCount(prev => prev + 1);
    if (eggCount + 1 === 5) {
      if (confettiRef.current) confettiRef.current.start();
      Alert.alert("🎉 Developer Mode", "You found the secret! You are now officially a 'DeciMate Pro'. (This does nothing, but you feel cool now).");
      setEggCount(0);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} autoStart={false} ref={confettiRef} fadeOut={true} />
      
      {/* Dynamic Gradient Background */}
      <LinearGradient colors={themeColors} style={{flex:1}}>
        <SafeAreaView style={{ flex: 1 }}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* --- NEW: STATS DASHBOARD --- */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="lightning-bolt" size={24} color="#fbbf24" />
                <Text style={styles.statNumber}>{totalDecisions}</Text>
                <Text style={styles.statLabel}>Decisions</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="clock-fast" size={24} color="#4ade80" />
                <Text style={styles.statNumber}>{timeSaved}m</Text>
                <Text style={styles.statLabel}>Time Saved</Text>
              </View>
            </View>

            {/* --- SECTION 1: AI BRAIN --- */}
            <Text style={styles.sectionTitle}>AI Personality</Text>
            <View style={styles.sectionContainer}>
              {["Balanced", "Strict", "Zen"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.optionRow, personality === type && styles.activeOption]}
                  onPress={() => changePersonality(type)}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons 
                      name={type === "Strict" ? "robot-angry" : type === "Zen" ? "meditation" : "scale-balance"} 
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

            {/* --- EASTER EGG ON VERSION TAP --- */}
            <TouchableOpacity activeOpacity={1} onPress={handleEasterEgg}>
              <Text style={styles.footerText}>DeciMate v1.2.0 • Powered by Gemini</Text>
            </TouchableOpacity>

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