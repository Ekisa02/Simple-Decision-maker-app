import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker"; // Import Document Picker
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getBestDecision } from "../app/services/gemini.js";
import { styles } from "../assets/styles/index.js";

// --- DATA LISTS ---
const STUDENT_ACTIVITIES = ["Study Math", "Revise Notes", "Group Project", "Gym", "Power Nap", "Video Games", "Clean Room", "Laundry"];
const PRO_ACTIVITIES = ["Client Meeting", "Deep Work", "Check Emails", "Networking", "Gym", "Grocery Run", "Review Finances", "Sleep"];

export default function Index() {
  const [currentPlan, setCurrentPlan] = useState({ 
    decision: "Tap to Decide", 
    reason: "Let AI organize your day", 
    icon: "analytics-outline", 
    color: "#a78bfa" 
  });
  
  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- NEW STATES FOR SELECTION ---
  const [userRole, setUserRole] = useState("Student"); // "Student" or "Professional"
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Toggle Activity Selection
  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(prev => prev.filter(item => item !== activity));
    } else {
      setSelectedActivities(prev => [...prev, activity]);
    }
  };

  // Handle File Upload
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*", "text/*"], // Allow PDFs, Images, Text
      });

      if (!result.canceled) {
        setUploadedFile(result.assets[0]);
        Alert.alert("Uploaded", `File selected: ${result.assets[0].name}`);
      }
    } catch (err) {
      console.log("Unknown Error: ", err);
    }
  };

  const handleSmartDecide = async () => {
    if (selectedActivities.length === 0 && !uploadedFile) {
      Alert.alert("Input Required", "Please select at least one activity or upload a plan.");
      return;
    }

    setLoading(true);
    
    // Pass the complex data to our service
    const fileName = uploadedFile ? uploadedFile.name : null;
    const timeFrame = new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening";

    const result = await getBestDecision(userRole, selectedActivities, fileName, timeFrame);

    setLoading(false);
    setModalVisible(false);

    if (result) {
      const newDecision = {
        decision: result.decision,
        reason: result.reason,
        icon: result.icon || "star-outline",
        color: "#4ade80"
      };
      setCurrentPlan(newDecision);
      setHistory((prev) => [newDecision, ...prev].slice(0, 3));
      // Reset selections
      setSelectedActivities([]);
      setUploadedFile(null);
    } else {
      Alert.alert("AI Error", "Could not generate a decision.");
    }
  };

  // Determine which list to show
  const currentList = userRole === "Student" ? STUDENT_ACTIVITIES : PRO_ACTIVITIES;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#1a0033", "#2e0249", "#111827"]} style={styles.safeArea}>
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
              <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]} style={styles.glassCard}>
                {loading ? (
                  <ActivityIndicator size="large" color="#a78bfa" />
                ) : (
                  <>
                    <View style={[styles.iconCircle, { backgroundColor: currentPlan.color + '20' }]}>
                      <Ionicons name={currentPlan.icon} size={40} color={currentPlan.color} />
                    </View>
                    <Text style={styles.cardLabel}>AI RECOMMENDATION</Text>
                    <Text style={styles.decisionText}>{currentPlan.decision}</Text>
                    <Text style={{color: "#ccc", textAlign: "center", marginTop: 10, paddingHorizontal: 10}}>
                      {currentPlan.reason}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </View>

            {/* --- ACTION BUTTON --- */}
            <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
              <LinearGradient colors={["#8b5cf6", "#6d28d9"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButton}>
                <MaterialCommunityIcons name="robot" size={24} color="white" />
                <Text style={styles.btnText}>Analyze My Options</Text>
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

        {/* --- MULTI-CHOICE MODAL --- */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Help me Decide</Text>

              {/* 1. ROLE SELECTOR */}
              <View style={styles.roleContainer}>
                <TouchableOpacity onPress={() => setUserRole("Student")} style={[styles.roleButton, userRole === "Student" && styles.roleButtonActive]}>
                  <Text style={[styles.roleText, userRole === "Student" && styles.roleTextActive]}>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUserRole("Professional")} style={[styles.roleButton, userRole === "Professional" && styles.roleButtonActive]}>
                  <Text style={[styles.roleText, userRole === "Professional" && styles.roleTextActive]}>Professional</Text>
                </TouchableOpacity>
              </View>

              {/* 2. CHIP SELECTION */}
              <Text style={styles.inputLabel}> What`s on your mind? (Select multiple)</Text>
              <View style={styles.chipsContainer}>
                {currentList.map((activity, index) => {
                  const isActive = selectedActivities.includes(activity);
                  return (
                    <TouchableOpacity 
                      key={index} 
                      style={[styles.chip, isActive && styles.chipActive]} 
                      onPress={() => toggleActivity(activity)}
                    >
                      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{activity}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* 3. FILE UPLOAD */}
              <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                <Ionicons name={uploadedFile ? "document-text" : "cloud-upload-outline"} size={30} color={uploadedFile ? "#4ade80" : "#a78bfa"} />
                <Text style={{color: "#ccc", marginTop: 5}}>
                  {uploadedFile ? uploadedFile.name : "Upload Timetable / Plan"}
                </Text>
              </TouchableOpacity>

              {/* 4. BUTTONS */}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={{color: "#ef4444", fontWeight: "bold"}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSmartDecide}>
                  {loading ? <ActivityIndicator color="#fff" size="small"/> : <Text style={{color: "#fff", fontWeight: "bold"}}>Decide For Me</Text>}
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}