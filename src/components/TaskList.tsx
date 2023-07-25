import STRINGS from '../constants/strings';
import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Animated, StyleSheet,  Modal,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {

  Portal,
  TextInput,
  Button as PaperButton,
} from 'react-native-paper';
import COLORS from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  useAnimation,
  useFilter,
  useFocus,
  useTasks,
} from '../state/tasks/hooks';
import {TaskBar as TabBar, TaskInput, TaskItem} from '.';

const TaskList: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  const {tasks, addTask, toggleTaskCompleted, deleteTask, editTask} =
    useTasks();
  const {isFocused, handleFocus, handleBlur} = useFocus();
  const {buttonScale, animateButtonPress, opacity} = useAnimation();
  const filteredTasks = useFilter(tasks, filter);
  const safeAreaOpacity=()=>{
    return editTaskId!=null?0.2:1;
  }
  return (
    <SafeAreaView style={{...styles.safeArea,opacity:safeAreaOpacity()}}>
      <Animated.View style={[styles.container, {opacity}]}>
        <TabBar filter={filter} setFilter={setFilter} />

        {filter == 'uncompleted' && (
          <TaskInput
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            addTask={string => {
              addTask(string);
              setNewTaskTitle('');
            }}
            animateButtonPress={animateButtonPress}
            isFocused={isFocused}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            buttonScale={buttonScale}
          />
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={filteredTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TaskItem
              key={item.id}
              item={item}
              toggleTaskCompleted={toggleTaskCompleted}
              setEditTaskId={setEditTaskId}
              setEditTaskTitle={setEditTaskTitle}
              deleteTask={deleteTask}
            />
          )}
        />

        <Portal>
          <Modal
            transparent
            visible={editTaskId !== null}
            onDismiss={() => setEditTaskId(null)}
            style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                value={editTaskTitle}
                onChangeText={setEditTaskTitle}
                placeholder={STRINGS.editTaskTitlePlaceholder}
              />

              <PaperButton
                style={styles.button}
                mode="contained"
                onPress={() =>
                  editTask(editTaskId, editTaskTitle, () => setEditTaskId(null))
                }>
                {STRINGS.saveButtonLabel}
              </PaperButton>
            </View>
          </Modal>
        </Portal>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.gray,
  },
  list: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,

    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  button: {
    marginBottom: 10,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    paddingHorizontal:30,
    borderRadius: 10,
    paddingVertical:10,
    alignSelf:'center',
    top:120,
    width: '90%',
    maxHeight: '100%',
  },
});

export default TaskList;
