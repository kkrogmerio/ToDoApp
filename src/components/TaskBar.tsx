import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import STRINGS from '../constants/strings';
interface TabBarProps {
  filter: string;
  setFilter: (filter: string) => void;
}


const TabBar: React.FC<TabBarProps> = ({ filter, setFilter }) => (
  <View style={styles.tabContainer}>
    <PaperButton
      mode={filter === 'all' ? 'contained' : 'outlined'}
      onPress={() => setFilter('all')}
    >
      {STRINGS.all}
    </PaperButton>
    <PaperButton
      mode={filter === 'completed' ? 'contained' : 'outlined'}
      onPress={() => setFilter('completed')}
    >
      {STRINGS.completed}
    </PaperButton>
    <PaperButton
      mode={filter === 'uncompleted' ? 'contained' : 'outlined'}
      onPress={() => setFilter('uncompleted')}
    >
      {STRINGS.uncompleted}
    </PaperButton>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default TabBar;
