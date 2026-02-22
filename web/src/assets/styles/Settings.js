import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
  },
  backButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  scrollContent: { 
    padding: 20,
    paddingBottom: 50
  },

  // --- NEW: STATS CARD STYLES ---
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // --- SECTIONS ---
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#a78bfa", // Light Purple
    marginBottom: 12,
    marginTop: 25,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  sectionContainer: {
    backgroundColor: "rgba(255,255,255,0.03)", // Very subtle glass
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  
  // --- ROW ITEMS ---
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  activeOption: {
    backgroundColor: "rgba(139, 92, 246, 0.15)", // Active Purple Highlight
    borderLeftWidth: 3,
    borderLeftColor: "#8b5cf6",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
  },
  
  // --- TEXT ---
  optionText: {
    fontSize: 16,
    color: "#e5e7eb",
    marginLeft: 12,
    fontWeight: "500",
  },
  helperText: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 10,
    marginLeft: 5,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  footerText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 50,
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8
  },
  
  // --- BEAUTIFUL MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)", // Dark overlay
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1e1b4b", // Deep Indigo Background
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 25,
  },
  modalIconContainer: {
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    padding: 15,
    borderRadius: 50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  textArea: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "#fff",
    borderRadius: 16,
    padding: 16,
    height: 140,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    fontSize: 16,
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ef4444",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#8b5cf6", // Vibrant Purple
    alignItems: "center",
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  }
});