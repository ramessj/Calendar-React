/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, NavBar, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


export const CalendarPage = () => {

	const { user } = useAuthStore();


	const { openDateModal } = useUiStore()

	const {events, setActiveEvent, clearActiveEvent, activeEvent, startLoadingEvents} = useCalendarStore()

	const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

	
	const eventStyleGetter = (event, isSelected  ) => {



		const isMyEvent = (user.id === event.user._id) || (user.uid === event.user._id);

		const style = {
			backgroundColor: isMyEvent ? '#347CF7' : '#e8c680',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white'			
		};

		if (isSelected && activeEvent && event.id === activeEvent.id) {
      
			style.backgroundColor = (isMyEvent ?  '#3166f7' :  '#cca556');
			style.opacity = '1';
			style.fontSize = '1.01rem'
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

		if(activeEvent){

		clearActiveEvent()
		}
	}

	useEffect(() => {

		startLoadingEvents()
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] )
	
	
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
