import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthContext } from "../../context/AuthContext";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

const colorScheme = useColorScheme();

const sampleChats: ChatItem[] = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey, how are you doing?",
    timestamp: "2:30 PM",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Bob Smith",
    lastMessage: "Thanks for the help!",
    timestamp: "1:45 PM",
  },
  {
    id: "3",
    name: "Carol Williams",
    lastMessage: "See you tomorrow!",
    timestamp: "12:20 PM",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "David Brown",
    lastMessage: "The meeting is at 3 PM",
    timestamp: "11:15 AM",
  },
  {
    id: "5",
    name: "Emma Davis",
    lastMessage: "Great work on the project!",
    timestamp: "10:30 AM",
  },
];

function ChatListItem({ chat }: { chat: ChatItem }) {
  return (
    <TouchableOpacity style={styles.chatItem}>
      <ThemedView style={styles.avatar}>
        <ThemedText style={styles.avatarText}>
          {chat.name.charAt(0).toUpperCase()}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.chatContent}>
        <ThemedView style={styles.chatHeader}>
          <ThemedText style={styles.chatName}>{chat.name}</ThemedText>
          <ThemedText style={styles.timestamp}>{chat.timestamp}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.messageRow}>
          <ThemedText style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </ThemedText>
          {chat.unreadCount && chat.unreadCount > 0 && (
            <ThemedView style={styles.unreadBadge}>
              <ThemedText style={styles.unreadText}>
                {chat.unreadCount}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

export default function Home() {
  const context = useContext(AuthContext);

  // Safety check
  if (!context) return null;

  const { session } = context;

  const [modalVisible, setModalVisible] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSendChatRequest = async () => {
    if (!emailInput.trim()) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }

    // Here you would typically send the chat request to your backend
    // For now, we'll just show a success message
    Alert.alert("Chat Request Sent", `Chat request sent to ${emailInput}`, [
      {
        text: "OK",
        onPress: () => {
          setModalVisible(false);
          setEmailInput("");
        },
      },
    ]);

    sampleChats.push({
      name: emailInput,
      id: "",
      lastMessage: "",
      timestamp: new Date()?.toISOString(),
    });
  };

  const openNewChatModal = () => {
    setModalVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>Chats</ThemedText>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {sampleChats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={openNewChatModal}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView
            style={{
              ...styles.modalContent,
              backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "white",
            }}
          >
            <ThemedText style={styles.modalTitle}>Start New Chat</ThemedText>
            <TextInput
              style={{
                ...styles.emailInput,
                backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "white",
                borderColor: colorScheme === "dark" ? "#444" : "#ddd",
                color: colorScheme === "dark" ? "white" : "black",
              }}
              placeholder="Enter email address"
              placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
              value={emailInput}
              onChangeText={setEmailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus={true}
            />
            <ThemedView style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.cancelButton,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#333" : "#f0f0f0",
                  },
                ]}
                onPress={() => {
                  setModalVisible(false);
                  setEmailInput("");
                }}
              >
                <ThemedText
                  style={[
                    styles.cancelButtonText,
                    {
                      color: colorScheme === "dark" ? "#ccc" : "#666",
                    },
                  ]}
                >
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleSendChatRequest}
              >
                <ThemedText style={styles.sendButtonText}>Send</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    backgroundColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
