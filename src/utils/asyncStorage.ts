import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/tasks";
export const loadTasksFromStorage = async (): Promise<Task[]> => {
    const storedTasks = await AsyncStorage.getItem('@tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks) as Task[];
    } else {
      return [];
    }
  };