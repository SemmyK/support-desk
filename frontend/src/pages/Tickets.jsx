import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/tickets/ticketSlice'

import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import FadeLoader from 'react-spinners/FadeLoader'

function Tickets() {
	const { tickets } = useSelector(state => state.ticket)

	const dispatch = useDispatch()

	// NOTE: only need one useEffect here

	useEffect(() => {
		dispatch(getTickets())
	}, [dispatch])

	// NOTE: no need for loading state, we can check for absence of tickets
	// If we don't have tickets we are loading, if we do have tickets we just
	// need to update the tickets with latest tickets in the background
	if (!tickets) {
		return (
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'center',
				}}
			>
				<FadeLoader height='30px' width='5px' radius='20px' />
			</div>
		)
	}

	return (
		<>
			<BackButton />
			<h1>Tickets</h1>
			<div className='tickets'>
				<div className='ticket-headings'>
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets.map(ticket => (
					<TicketItem key={ticket._id} ticket={ticket} />
				))}
			</div>
		</>
	)
}

export default Tickets
