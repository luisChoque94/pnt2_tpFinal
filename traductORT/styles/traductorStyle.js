import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  signOutButton: {
    padding: 8,
  },
  signOutText: {
    color: "#007AFF",
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    minHeight: 80,
    textAlignVertical: "top",
  },
  resultadoContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
  resultadoLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  resultado: {
    fontSize: 18,
  },
  picker: {
  height: 40,
  width: "100%",
  backgroundColor: "#e0e0e0",
  color: "#333333",
  borderWidth: 1,
  borderColor: "#888",
  borderRadius: 8,
  marginBottom: 12,
  paddingHorizontal: 10,
}
})
