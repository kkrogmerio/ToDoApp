import React from 'react';
import { TextInput, Animated, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import STRINGS from '../constants/strings';
import COLORS from '../constants/colors';
interface TaskInputProps {
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  addTask: (newTaskTitle:string) => void;
  animateButtonPress: () => void;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  buttonScale: Animated.Value;
}


const TaskInput: React.FC<TaskInputProps> = ({
  newTaskTitle,
  setNewTaskTitle,
  addTask,
  animateButtonPress,
  isFocused,
  handleFocus,
  handleBlur,
  buttonScale,
}) => (
  <>
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[
        styles.input,
        isFocused && { borderColor: 'blue' },
      ]}
      value={newTaskTitle}
      onChangeText={setNewTaskTitle}
      placeholder={STRINGS.placeholder}
    />

    <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
      <PaperButton
        style={styles.button}
        mode="contained"
        onPress={() => {
          animateButtonPress();
          addTask(newTaskTitle);
        }}
      >
        {STRINGS.addButtonLabel}
      </PaperButton>
    </Animated.View>
  </>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  button: {
    marginBottom: 10,
    elevation: 3,
  },
});

export default TaskInput;
