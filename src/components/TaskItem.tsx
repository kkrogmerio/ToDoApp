import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import STRINGS from '../constants/strings';
import COLORS from '../constants/colors';
interface TaskItemProps {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  toggleTaskCompleted: (id: number) => void;
  setEditTaskId: (id: number) => void;
  setEditTaskTitle: (title: string) => void;
  deleteTask: (id: number) => void;
}


const TaskItem: React.FC<TaskItemProps> = ({
  item,
  toggleTaskCompleted,
  setEditTaskId,
  setEditTaskTitle,
  deleteTask,
}) => (
    
  <Pressable
    style={styles.listItem}
    onPress={() => toggleTaskCompleted(item.id)}>
    <View style={styles.taskContainer}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.text,
            item.completed && styles.completedText,
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.status,
            item.completed && styles.completedStatus,
          ]}>
          {item.completed
            ? STRINGS.completedStatus
            : STRINGS.notCompletedStatus}
        </Text>
      </View>
    </View>

    <View style={styles.buttonContainer}>
      <PaperButton
        style={styles.editButton}
        mode="outlined"
        onPress={() => {
          setEditTaskId(item.id);
          setEditTaskTitle(item.title);
        }}>
        {STRINGS.editButtonLabel}
      </PaperButton>

      <PaperButton
        style={styles.deleteButton}
        mode="outlined"
        onPress={() => deleteTask(item.id)}>
        {STRINGS.deleteButtonLabel}
      </PaperButton>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
    listItem: {
      marginBottom: 10,
      borderWidth: 1,
      padding: 10,
      borderColor: COLORS.purple,
      borderRadius: 10,
    },
    taskContainer: {
      backgroundColor: COLORS.gray,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      flex: 1,
      marginRight: 10,
      fontSize: 16,
    },
    completedText: {
      textDecorationLine: 'line-through',

    },
    status: {
      fontSize: 12,

    },
    completedStatus: {
      color: COLORS.green,
    },
    buttonContainer: {
      flexDirection: 'row',
      flex: 2,
      justifyContent: 'flex-end',
    },
    editButton: {
      marginRight: 10,
      elevation: 2,
    },
    deleteButton: {
      marginLeft: 10,
      elevation: 2,
    },
  });

export default TaskItem;
