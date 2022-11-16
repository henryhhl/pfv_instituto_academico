
import AppRoute from './routes/appRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoute />
      </Provider>
    </>
  );
}

export default App;
