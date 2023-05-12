import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
	// const authStatus = 'not-authenticated'; // 'authenticated'

	const { checkAuthToken, status } = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (status === 'checking') {
		return <h4>Cargando...</h4>;
	}

	return (
		<Routes>
			{status === 'not-authenticated' ? (
				<>
					<Route path="/auth/login" element={<LoginPage />} />
					<Route path="/*" element={<Navigate to="/auth/login" />} />
				</>
			) : (
				<>
					<Route path="/" element={<CalendarPage />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</>
			)}
		</Routes>
	);
};
