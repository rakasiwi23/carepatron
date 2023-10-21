import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import ClientRow from './ClientRow';

interface Props {
	query: string;
	clients: Client[];
}
export default function BasicTable({ query, clients }: Props) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		if (query) {
			setPage(0);
			setRowsPerPage(5);
		}
	}, [query]);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

	const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<TableContainer component={Paper} elevation={0} sx={{ maxWidth: '100%' }}>
				<Table sx={{ minWidth: 400 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography fontSize={14} fontWeight={700}>
									Name
								</Typography>
							</TableCell>
							<TableCell>
								<Typography fontSize={14} fontWeight={700}>
									Phone
								</Typography>
							</TableCell>
							<TableCell>
								<Typography fontSize={14} fontWeight={700}>
									Email
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: clients
						).map((client) => (
							<ClientRow key={client.id} client={client} />
						))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={clients.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
}
