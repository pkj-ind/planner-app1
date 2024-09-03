import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

export default function App() {
  const [plan, setPlan] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    if (plan.trim() !== '') {
      setGoals([...goals, { id: Date.now().toString(), text: plan.trim() }]);
      setPlan('');
    }
  };

  const handleGoalPress = (id, text) => {
    Alert.alert(
      "Goal Options",
      "What would you like to do with this goal?",
      [
        {
          text: "Edit",
          onPress: () => editGoal(id, text)
        },
        {
          text: "Delete",
          onPress: () => deleteGoal(id),
          style: "destructive"
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const editGoal = (id, text) => {
    Alert.prompt(
      "Edit Goal",
      "Update your goal:",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Update",
          onPress: (newText) => {
            if (newText.trim() !== '') {
              setGoals(goals.map(goal => 
                goal.id === id ? { ...goal, text: newText.trim() } : goal
              ));
            }
          }
        }
      ],
      "plain-text",
      text
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const renderGoalItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleGoalPress(item.id, item.text)}>
      <View style={styles.goalBox}>
        <Text style={styles.goalText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Planner</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your plan"
          value={plan}
          onChangeText={setPlan}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    marginTop: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  goalBox: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
    color: '#333',
  },
});
