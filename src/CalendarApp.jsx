import { Provider } from 'react-redux';
import { AppRouter } from './routes';
import { store } from './store';

export const CalendarApp = () => {
	return (
		<Provider store={store}>
				<AppRouter />
		</Provider>
	);
};
