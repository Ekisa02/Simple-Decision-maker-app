import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // --- Layout ---
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    // Add extra padding at bottom so content isn't hidden behind fixed footer
    paddingBottom: 80, 
  },
  
  // --- Header ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  subGreeting: {
    fontSize: 14,
    color: "#a78bfa", // Light Purple
    marginTop: 4,
    fontWeight: "500",
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  // --- Main Card (Glassmorphism) ---
  cardContainer: {
    marginBottom: 40,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  glassCard: {
    padding: 30,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minHeight: 250,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 10,
  },
  decisionText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    lineHeight: 40,
  },
  // Added for Timetable support
  reasonText: {
    color: "#ccc", 
    textAlign: "center", 
    marginTop: 10, 
    paddingHorizontal: 10,
    lineHeight: 22,
    fontSize: 16
  },
  timetableText: {
    textAlign: "left",
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    borderRadius: 10,
    color: "#ddd",
    lineHeight: 22,
  },

  // --- Action Button ---
  actionButton: {
    marginBottom: 30,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientButton: {
    flexDirection: "row",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10, 
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  // --- History Section ---
  historySection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "rgba(255,255,255,0.2)",
  },
  historyText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
    fontWeight: "500"
  },
  timeText: {
    color: "#6b7280",
    fontSize: 12,
  },

  // --- FIXED FOOTER ---
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    backgroundColor: 'rgba(26, 0, 51, 0.95)', // Semi-transparent matching bg
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  footerText: {
    color: '#6b7280', 
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  linkText: {
    color: '#a78bfa',
    fontWeight: 'bold',
  },

  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end", // Bottom sheet style for input
  },
  modalContent: {
    backgroundColor: "#1f2937", 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    height: '80%', // Takes up 80% of screen
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  inputLabel: {
    color: "#a78bfa",
    fontSize: 14,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  
  // Role Selector
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    padding: 4,
    marginBottom: 10,
    marginTop: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  roleButtonActive: {
    backgroundColor: '#8b5cf6', 
  },
  roleText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Chips
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  chipActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: '#8b5cf6',
  },
  chipText: {
    color: '#e5e7eb',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // File Upload
  uploadBox: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: 15,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    gap: 10
  },
  
  // Modal Buttons
  modalButtons: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ef4444",
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
  },
  
  // Text Input
  textInput: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 20
  }
});