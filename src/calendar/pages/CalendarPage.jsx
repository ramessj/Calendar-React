import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { CalendarEvent, NavBar, CalendarModal } from '../';
import { localizer, getMessagesES } from '../../helpers';

const events = [
	{
		title: 'Cumpleaños del Jefe',
		notes: 'Comprar pastel',
		start: new Date(),
		end: addHours(new Date(), 2),
		bgColor: '#fafafa',
		user: {
			_id: '123456',
			name: 'Ramiro',
		},
	},
];

export const CalendarPage = () => {

	const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

	// eslint-disable-next-line no-unused-vars
	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#347CF7',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
		};

		return {
			style
		};
	};


	const onDoubleClick = ( event ) => {
		console.log({ doubleClick: event})
	}
	const onSelect = ( event ) => {
		console.log({ click: event})
	}
	const onViewChanged = ( event ) => {
		localStorage.setItem('lastView', event);
		setlastView( event )
	}
	
	return (
		<>
			<NavBar />

			<div>
				<Calendar
					culture="es"
					localizer={localizer}
					events={events}
					defaultView={lastView}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 'calc(100vh - 80px)' }}
					messages={getMessagesES()}
					eventPropGetter={eventStyleGetter}
					components={{ event: CalendarEvent }}
					onDoubleClickEvent={ onDoubleClick }
					onSelectEvent={ onSelect }
					onView={ onViewChanged }
					/>

					
			</div>

			<CalendarModal />
		</>
	);
};
