import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Import the separated styles
import { styles } from "../assets/styles/index.js";

const decisions = [
  { text: "Save $50 today", icon: "wallet-outline", color: "#4ade80" }, 
  { text: "Order Pizza", icon: "pizza-outline", color: "#fbbf24" }, 
  { text: "Go for a Run", icon: "walk-outline", color: "#60a5fa" }, 
  { text: "Read a Book", icon: "book-outline", color: "#a78bfa" }, 
  { text: "Call Mom", icon: "call-outline", color: "#f472b6" }, 
  { text: "No Spending", icon: "ban-outline", color: "#f87171" }, 
];

export default function Index() {
  const [currentPlan, setCurrentPlan] = useState(decisions[0]);
  const [history, setHistory] = useState([]);

  const handleDecision = () => {
    const randomIndex = Math.floor(Math.random() * decisions.length);
    const newDecision = decisions[randomIndex];
    
    setCurrentPlan(newDecision);
    setHistory((prev) => [newDecision, ...prev].slice(0, 3));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={["#1a0033", "#2e0249", "#111827"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* --- HEADER --- */}
          <View style={styles.header}>
            <View>
              {/* APP NAME */}
              <Text style={styles.appName}>DeciMate</Text>
              <Text style={styles.subGreeting}>Simplify your choices</Text>
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
              <View style={[styles.iconCircle, { backgroundColor: currentPlan.color + '20' }]}>
                <Ionicons name={currentPlan.icon} size={40} color={currentPlan.color} />
              </View>
              
              <Text style={styles.cardLabel}>DECISION</Text>
              <Text style={styles.decisionText}>{currentPlan.text}</Text>
            </LinearGradient>
          </View>

          {/* --- ACTION BUTTON --- */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDecision}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#8b5cf6", "#6d28d9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <MaterialCommunityIcons name="magic-staff" size={24} color="white" />
              <Text style={styles.btnText}>Decimate Selection</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* --- HISTORY --- */}
          {history.length > 0 && (
            <View style={styles.historySection}>
              <Text style={styles.sectionTitle}>Previous Choices</Text>
              {history.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                  <Text style={styles.historyText}>{item.text}</Text>
                  <Text style={styles.timeText}>Just now</Text>
                </View>
              ))}
            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

