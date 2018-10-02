import ReactDOM from 'react-dom';
import { withApolloClient } from './apolloClient';
import App from './App';
import './css/semantic.min.css';

ReactDOM.render(withApolloClient(App), document.getElementById('root'));