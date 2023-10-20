import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ClientRow from './ClientRow';

type Props = {
	clients: IClient[];
};
export default function BasicTable({ clients }: Props) {
	return (
		<TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
			<Table sx={{ minWidth: 400 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Phone number</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{clients.map((client) => (
						<ClientRow key={client.id} client={client} />
					))}
					{!clients ||
						(!clients.length && (
							<TableRow sx={{ padding: 3 }}>
								<TableCell component='th' scope='row'>
									No clients
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
