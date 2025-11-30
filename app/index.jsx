import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/styles/index.js";

// Import our new AI Service
import { getBestDecision } from "../app/services/gemini.js";

const initialPlan = { 
  decision: "Tap to Decide", 
  reason: "Let AI organize your day", 
  icon: "analytics-outline", 
  color: "#a78bfa" 
};

export default function Index() {
  // State for AI Results
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const [history, setHistory] = useState([]);
  
  // State for Modal & Inputs
  const [modalVisible, setModalVisible] = useState(false);
  const [userTasks, setUserTasks] = useState("");
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [loading, setLoading] = useState(false);

  const handleSmartDecide = async () => {
    if (!userTasks.trim()) {
      Alert.alert("Input Required", "Please enter your tasks or plans.");
      return;
    }

    setLoading(true);
    
    // Call Gemini API
    const result = await getBestDecision(userTasks, timeFrame);

    setLoading(false);
    setModalVisible(false);

    if (result) {
      // Create a display object
      const newDecision = {
        decision: result.decision, // From AI JSON
        reason: result.reason,     // From AI JSON
        icon: result.icon || "star-outline", // From AI JSON
        color: "#4ade80" // Success Green
      };

      setCurrentPlan(newDecision);
      setHistory((prev) => [newDecision, ...prev].slice(0, 3));
      setUserTasks(""); // Clear input
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1a0033", "#2e0249", "#111827"]}
        style={styles.safeArea} // Using absolute fill from styles if possible, or flex:1
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* --- HEADER --- */}
            <View style={styles.header}>
              <View>
                <Text style={styles.appName}>DeciMate AI</Text>
                <Text style={styles.subGreeting}>Smart choices, powered by Gemini</Text>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <Ionicons name="settings-sharp" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* --- MAIN CARD --- */}
            <View style={styles.cardContainer}>
              <LinearGradient
                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
                style={styles.glassCard}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#a78bfa" />
                ) : (
                  <>
                    <View style={[styles.iconCircle, { backgroundColor: currentPlan.color + '20' }]}>
                      <Ionicons name={currentPlan.icon} size={40} color={currentPlan.color} />
                    </View>
                    
                    <Text style={styles.cardLabel}>AI RECOMMENDATION</Text>
                    <Text style={styles.decisionText}>{currentPlan.decision}</Text>
                    
                    {/* Reason Subtext */}
                    <Text style={{color: "#ccc", textAlign: "center", marginTop: 10, paddingHorizontal: 10}}>
                      {currentPlan.reason}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </View>

            {/* --- ACTION BUTTON --- */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#8b5cf6", "#6d28d9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <MaterialCommunityIcons name="robot" size={24} color="white" />
                <Text style={styles.btnText}>Ask AI to Decide</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* --- HISTORY --- */}
            {history.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Previous AI Choices</Text>
                {history.map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                    <View style={{flex: 1, marginLeft: 15}}>
                      <Text style={styles.historyText}>{item.decision}</Text>
                      <Text style={{color: "#aaa", fontSize: 12}}>{item.reason}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

          </ScrollView>
        </SafeAreaView>

        {/* --- INPUT MODAL --- */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Input Your Plan</Text>

              {/* Task Input */}
              <Text style={styles.inputLabel}>Activities / Options / Tasks</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="e.g., Gym, Study Math, Buy Groceries, Sleep (I only have 2 hours)"
                placeholderTextColor="#6b7280"
                multiline={true}
                numberOfLines={4}
                value={userTasks}
                onChangeText={setUserTasks}
              />

              {/* Timeframe Input (Simple for now) */}
              <Text style={styles.inputLabel}>Timeframe (e.g., Today, Week)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Today"
                placeholderTextColor="#6b7280"
                value={timeFrame}
                onChangeText={setTimeFrame}
              />

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{color: "#ef4444", fontWeight: "bold"}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleSmartDecide}
                >
                  {loading ? (
                     <ActivityIndicator color="#fff" size="small"/>
                  ) : (
                    <Text style={{color: "#fff", fontWeight: "bold"}}>Analyze</Text>
                  )}
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </Modal>

      </LinearGradient>
    </View>
  );
}