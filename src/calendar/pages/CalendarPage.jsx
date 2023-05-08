/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, NavBar, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

	const { openDateModal } = useUiStore()

	const {events, setActiveEvent, clearActiveEvent, activeEvent} = useCalendarStore()

	const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

	
	const eventStyleGetter = (event, start, end, isSelected  ) => {
		const style = {
			backgroundColor: '#347CF7',
			borderRadius: '0px',
			opacity: 0.6,
			color: 'white'			
		};

		if (isSelected && activeEvent && event.id === activeEvent.id) {
      style.backgroundColor = '#318CF7';
			style.opacity = '1'
    }

		return {
			style
		};
	};


	const onDoubleClick = () => {
		openDateModal();
	}
	const onSelect = ( event ) => {
		setActiveEvent(event);
	}
	const onViewChanged = ( event ) => {
		localStorage.setItem('lastView', event);
		setlastView( event )
	}

	const onClickOutsideEvent = () => {
		clearActiveEvent()
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
					selectable= {true}
					onSelectSlot={ onClickOutsideEvent }
					/>

					
			</div>

			<CalendarModal />

			<FabAddNew></FabAddNew>
			<FabDelete></FabDelete>
		</>
	);
};
