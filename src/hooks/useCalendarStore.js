import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onClearActiveEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

	const dispatch = useDispatch()

	const { events, activeEvent } = useSelector(store=> store.calendar)


	const setActiveEvent = ( calendarEvent ) => {
		dispatch( onSetActiveEvent(calendarEvent) )
	}

	const startSavingEvent = async(calendarEvent) => {
		//* LLegar al backend
		//* Todo bien

		if(calendarEvent._id){
			dispatch( onUpdateEvent( {...calendarEvent} ) )
		}
		else{
			dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ) )
		}
	};

	const startDeletingEvent = () => {
		dispatch (onDeleteEvent());
	};

	const clearActiveEvent = () => {
		dispatch( onClearActiveEvent() )
	}



	return{

		//* Propiedades
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//* Métodos
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		clearActiveEvent,

	}
}