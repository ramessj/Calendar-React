/* eslint-disable react/prop-types */
export const CalendarEvent = ({ event = {} }) => {
	const { title, user } = event;

	return (
		<>
			<strong>{title}</strong>
			<br />
			<span>{user.name}</span>
		</>
	);
};
