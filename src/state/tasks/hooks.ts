import  {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadTasksFromStorage} from '../../utils/asyncStorage';
import {Task} from '../../types/tasks';
import {Animated,Alert} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const tasks: Task[] = await loadTasksFromStorage();
      setTasks(tasks);
    })();
    return ()=>{
      AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    }
  }, []);



  const addTask = (newTaskTitle: string) => {
    if (!newTaskTitle) return;

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskCompleted = (id:string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = (id:string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

const editTask = (editTaskId: string | null, editTaskTitle: string, resetEditTaskId: Function) => {
    if (editTaskTitle.trim().length === 0) {
        Alert.alert('Error', 'Task title cannot be empty');
        return;
      }
    setTasks(
      tasks.map(task =>
        task.id === editTaskId ? {...task, title: editTaskTitle} : task,
      ),
    );
    resetEditTaskId(); // Reset the editTaskId after editing the task
};

  return {tasks, addTask, toggleTaskCompleted, deleteTask, editTask};
}

export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return {isFocused, handleFocus, handleBlur};
}

export function useAnimation() {
  const buttonScale = useRef(new Animated.Value(1)).current;
  const opacity = useState(new Animated.Value(0))[0];

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return {buttonScale, animateButtonPress, opacity};
}

export function useFilter(tasks: Task[], filter: string) {
  return tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'uncompleted') return !task.completed;
    return true;
  });
}
