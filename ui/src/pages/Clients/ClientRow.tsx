import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface Props {
	client: Client;
}
export default function ClientListItem({ client }: Props) {
	const { id, firstName, lastName, email, phoneNumber } = client;

	return (
		<TableRow
			key={id}
			sx={{
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: '#f5f5f5',
				},
			}}
		>
			<TableCell
				component='th'
				scope='row'
				sx={{ color: '#345FFF', fontWeight: 700 }}
			>
				{firstName} {lastName}
			</TableCell>
			<TableCell>{phoneNumber}</TableCell>
			<TableCell>{email}</TableCell>
		</TableRow>
	);
}
