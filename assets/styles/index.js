import { StyleSheet } from "react-native";

// NOTE: We are using "styles" (plural) here to match the import in index.jsx
export const styles = StyleSheet.create({
  // --- Layout ---
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 50,
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
    fontSize: 16,
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

  // --- Action Button ---
  actionButton: {
    marginBottom: 40,
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
  },
  timeText: {
    color: "#6b7280",
    fontSize: 12,
  },
 
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Dimmed background
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1f2937", // Dark Grey
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    color: "#a78bfa",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", // Android fix for multiline
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    marginRight: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ef4444",
    borderRadius: 12,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    padding: 15,
    marginLeft: 10,
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    alignItems: "center",
  },
},
);