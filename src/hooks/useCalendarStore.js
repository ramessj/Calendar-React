import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewEvent,
	onClearActiveEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { convertDates } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector((store) => store.calendar);
	const { user } = useSelector((store) => store.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
	
		try {
			if (calendarEvent.id) {
				await calendarApi.put(
					`/events/${calendarEvent.id}`,
					calendarEvent
				);

				dispatch(onUpdateEvent({ ...calendarEvent, user }));

				return;
			}
			const { data } = await calendarApi.post('/events', calendarEvent);

			dispatch(
				onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })
			);
		} catch (error) {
			console.log(error);
			Swal.fire('Error al guardar', error.response.data.msg, 'error');
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent.id}`);

			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(error);
			Swal.fire('Error al eliminar', error.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');

			const events = convertDates(data.msg);

			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log('error cargando evento');
			console.log(error);
		}
	};

	const clearActiveEvent = () => {
		dispatch(onClearActiveEvent());
	};

	return {
		//* Propiedades
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//* Métodos
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		clearActiveEvent,
		startLoadingEvents,
	};
};
