import { useCalendarStore } from "../../hooks"


export const FabDelete  = () => {

	const { startDeletingEvent, hasEventSelected } = useCalendarStore();


	const handleClickDelete = () => {
		startDeletingEvent();
	}

	return (
		<button
			className="btn btn-danger fab-dng"
			onClick={handleClickDelete}
			style={{
				display: hasEventSelected ? '' : 'none'
			}}
		>
			<i className="fas fa-trash-alt"></i>
		</button>
	)
}
