import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getBestDecision } from "../app/services/gemini.js";
import { styles } from "../assets/styles/index.js";

const STUDENT_ACTIVITIES = ["Study/Learn", "Revise Notes", "Group Project", "Gym", "Power Nap", "Video Games", "Clean Room", "Laundry","Social Media","Coding","Home Work","Music","Game","Visit A friend"];
const PRO_ACTIVITIES = ["Client Meeting", "Deep Work", "Check Emails", "Networking", "Gym", "Music","Gaming","Drive","Clubbing","Grocery Run", "Review Finances", "Sleep","Find a kid"];

export default function Index() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const [currentPlan, setCurrentPlan] = useState({ 
    decision: "Tap to Decide", 
    reason: "Let AI organize your day", 
    icon: "analytics-outline", 
    color: "#a78bfa" 
  });
  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modals
  const [modalVisible, setModalVisible] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  
  const [nickname, setNickname] = useState("");
  const [tempNickname, setTempNickname] = useState("");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const [userRole, setUserRole] = useState("Student");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  // --- REFRESH LOGIC ---
  // This ensures history is reloaded every time you visit the home screen
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const storedName = await AsyncStorage.getItem("user_nickname");
      if (storedName) {
        setNickname(storedName);
        setWelcomeVisible(false);
      } else {
        setWelcomeVisible(true);
      }
    } catch (e) { console.log(e); }
  };

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("decision_history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      } else {
        setHistory([]);
      }
    } catch (e) { console.log(e); }
  };

  const saveNickname = async () => {
    if (!tempNickname.trim()) return Alert.alert("Hey!", "I need a name to call you.");
    try {
      await AsyncStorage.setItem("user_nickname", tempNickname);
      setNickname(tempNickname);
      setWelcomeVisible(false);
    } catch (e) { console.log(e); }
  };

  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(prev => prev.filter(item => item !== activity));
    } else {
      setSelectedActivities(prev => [...prev, activity]);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*", "text/*"],
      });
      if (!result.canceled) {
        setUploadedFile(result.assets[0]);
        Alert.alert("Uploaded", `File selected: ${result.assets[0].name}`);
      }
    } catch (err) { console.log("Unknown Error: ", err); }
  };

  const handleSmartDecide = async () => {
    if (selectedActivities.length === 0 && !uploadedFile) {
      Alert.alert("Input Required", "Please select at least one activity or upload a plan.");
      return;
    }

    setLoading(true);
    
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
        color: "#4ade80",
        timestamp: new Date().toLocaleString()
      };
      
      setCurrentPlan(newDecision);
      
      const updatedHistory = [newDecision, ...history];
      setHistory(updatedHistory);
      await AsyncStorage.setItem("decision_history", JSON.stringify(updatedHistory));

      setSelectedActivities([]);
      setUploadedFile(null);
    } else {
      Alert.alert("AI Error", "Could not generate a decision.");
    }
  };

  const openHistoryDetail = (item) => {
    setSelectedHistoryItem(item);
    setDetailModalVisible(true);
  };

  const currentList = userRole === "Student" ? STUDENT_ACTIVITIES : PRO_ACTIVITIES;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#1a0033", "#2e0249", "#111827"]} style={styles.safeArea}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            <View style={styles.header}>
              <View>
                <Text style={styles.appName}>DeciMate AI</Text>
                <Text style={styles.subGreeting}>
                  {nickname ? `Hi, ${nickname}!` : "Welcome"} • Smart choices
                </Text>
              </View>
              <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/Settings")}>
                <Ionicons name="settings-sharp" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

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

            <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
              <LinearGradient colors={["#8b5cf6", "#6d28d9"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButton}>
                <MaterialCommunityIcons name="robot" size={24} color="white" />
                <Text style={styles.btnText}>Analyze My Options</Text>
              </LinearGradient>
            </TouchableOpacity>

            {history.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Previous AI Choices</Text>
                {history.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.historyItem}
                    onPress={() => openHistoryDetail(item)}
                  >
                    <Ionicons name={item.icon} size={20} color={item.color} />
                    <View style={{flex: 1, marginLeft: 15}}>
                      <Text style={styles.historyText} numberOfLines={1}>{item.decision}</Text>
                      <Text style={{color: "#aaa", fontSize: 12}} numberOfLines={1}>{item.reason}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#666" />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <View style={{ marginTop: 40, alignItems: 'center', opacity: 0.6 }}>
              <Text style={{ color: '#aaa', fontSize: 12 }}>
                &copy; {currentYear} <Text style={{color: '#a78bfa'}} onPress={() => Linking.openURL('http://etech.ac.ke')}>E-Tech Company</Text>.
              </Text>
              <Text style={{ color: '#aaa', fontSize: 12 }}>All rights reserved.</Text>
            </View>

          </ScrollView>
        </SafeAreaView>

        {/* Welcome Modal */}
        <Modal animationType="fade" transparent={true} visible={welcomeVisible}>
           <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.9)", justifyContent:'center', alignItems:'center', padding: 20}}>
              <View style={[styles.glassCard, {width: '100%', borderColor: '#8b5cf6', borderWidth: 1}]}>
                  <View style={{marginBottom: 20, backgroundColor: 'rgba(139, 92, 246, 0.2)', padding: 20, borderRadius: 50}}>
                    <MaterialCommunityIcons name="robot-excited" size={60} color="#a78bfa" />
                  </View>
                  <Text style={{fontSize: 28, fontWeight:'bold', color:'white', marginBottom: 10, textAlign:'center'}}>
                    Beep Boop! 🤖
                  </Text>
                  <Text style={{color:'#ccc', textAlign:'center', fontSize: 16, marginBottom: 20, lineHeight: 24}}>
                    I am <Text style={{color:'#a78bfa', fontWeight:'bold'}}>DeciMate AI</Text>.{"\n"}
                    I exist to make decisions so you can keep your brain smooth and wrinkle-free.
                  </Text>
                  <Text style={{color:'white', fontWeight:'bold', marginBottom: 10}}>What should I call you, human?</Text>
                  
                  <TextInput 
                    style={[styles.textInput, {width: '100%', textAlign:'center', fontSize: 18}]}
                    placeholder="Enter nickname..."
                    placeholderTextColor="#666"
                    value={tempNickname}
                    onChangeText={setTempNickname}
                  />

                  <TouchableOpacity 
                    style={[styles.gradientButton, {marginTop: 20, width: '100%', backgroundColor: '#8b5cf6'}]}
                    onPress={saveNickname}
                  >
                    <Text style={{color:'white', fontWeight:'bold', fontSize: 18}}>Let&apos;s Get Started</Text>
                  </TouchableOpacity>
              </View>
           </View>
        </Modal>

        {/* Input Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Help me Decide</Text>

              <View style={styles.roleContainer}>
                <TouchableOpacity onPress={() => setUserRole("Student")} style={[styles.roleButton, userRole === "Student" && styles.roleButtonActive]}>
                  <Text style={[styles.roleText, userRole === "Student" && styles.roleTextActive]}>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUserRole("Professional")} style={[styles.roleButton, userRole === "Professional" && styles.roleButtonActive]}>
                  <Text style={[styles.roleText, userRole === "Professional" && styles.roleTextActive]}>Professional</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>What&apos;s on your mind? (Select multiple)</Text>
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

              <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                <Ionicons name={uploadedFile ? "document-text" : "cloud-upload-outline"} size={30} color={uploadedFile ? "#4ade80" : "#a78bfa"} />
                <Text style={{color: "#ccc", marginTop: 5}}>
                  {uploadedFile ? uploadedFile.name : "Upload Timetable / Plan"}
                </Text>
              </TouchableOpacity>

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

        {/* Detail Modal */}
        <Modal animationType="fade" transparent={true} visible={detailModalVisible} onRequestClose={() => setDetailModalVisible(false)}>
            <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: 'center', padding: 20}}>
                {selectedHistoryItem && (
                    <LinearGradient colors={["#2e0249", "#1a0033"]} style={[styles.glassCard, {borderWidth: 1, borderColor: selectedHistoryItem.color}]}>
                        
                        <View style={{alignItems:'center', marginBottom: 20}}>
                           <View style={[styles.iconCircle, {backgroundColor: selectedHistoryItem.color + '30', width: 60, height: 60}]}>
                               <Ionicons name={selectedHistoryItem.icon} size={30} color={selectedHistoryItem.color} />
                           </View>
                           <Text style={{color: '#aaa', marginTop: 10, fontSize: 12}}>Decided on: {selectedHistoryItem.timestamp}</Text>
                        </View>

                        <Text style={{fontSize: 14, color: '#a78bfa', fontWeight:'bold', letterSpacing: 1, textAlign:'center'}}>DECISION</Text>
                        <Text style={{fontSize: 28, color: 'white', fontWeight:'bold', textAlign:'center', marginVertical: 10}}>{selectedHistoryItem.decision}</Text>
                        
                        <View style={{backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 10, marginTop: 10}}>
                             <Text style={{color:'#ccc', fontSize: 16, lineHeight: 24, textAlign:'center', fontStyle:'italic'}}>
                                &quot;{selectedHistoryItem.reason}&quot;
                             </Text>
                        </View>

                        <TouchableOpacity 
                            style={[styles.actionButton, {marginTop: 30, marginBottom: 0, backgroundColor: selectedHistoryItem.color}]}
                            onPress={() => setDetailModalVisible(false)}
                        >
                             <Text style={{color:'white', fontWeight:'bold', textAlign:'center', padding: 15}}>Close</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )}
            </View>
        </Modal>

      </LinearGradient>
    </View>
  );
}