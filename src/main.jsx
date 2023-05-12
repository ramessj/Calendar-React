import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { CalendarApp } from './CalendarApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<HashRouter>
		<CalendarApp />
	</HashRouter>
);
