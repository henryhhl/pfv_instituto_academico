
import AppRoute from './routes/appRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

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
