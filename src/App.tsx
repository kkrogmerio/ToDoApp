import React from 'react';
import {TaskList} from './components';
import {Provider} from 'react-native-paper';

const App = () => {
  return (
    <Provider>
      <TaskList />
    </Provider>
  );
};

export default App;
