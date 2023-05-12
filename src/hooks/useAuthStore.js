import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth', {
				email,
				password,
			});

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 3000);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth/new', {
				name,
				email,
				password,
			});

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));


		} catch (error) {
			
			//TODO
			const errors = error.response.data.errors;

			const errorString = () => {
				let errorMsg = '';
				for (let error in errors) {
					errorMsg = errorMsg + `${(errorMsg.length > 0) ? ', ' + errors[error].msg : errors[error].msg}`;
				}
				return errorMsg;
			};

			dispatch(onLogout(errorString() || '---'));

			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 3000);
		}
	};


	const checkAuthToken = async() => {
		const storeToken = localStorage.getItem('token');

		if (!storeToken) return dispatch( onLogout() )
		
		try {
			const {data} = await calendarApi.get('auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch( onLogin({name: data.name, uid: data.uid}) )
		} catch (error) {
			localStorage.clear();
			dispatch( onLogout() )
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch( onLogout() )
	}

	return {
		//propiedades
		status,
		user,
		errorMessage,

		//metodos
		startLogin,
		startRegister,
		checkAuthToken,
		startLogout
	};
};
