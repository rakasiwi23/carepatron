import { Paper, Typography } from '@mui/material';
import { memo } from 'react';
import Page from '../../components/Page';
import { getClients } from '../../services/api';
import ClientTable from './ClientTable';

import { useQuery } from '@tanstack/react-query';

function Clients() {
	const {
		isPending,
		error,
		data: clients,
		isFetching,
	} = useQuery({
		queryKey: ['clients'],
		queryFn: () => getClients().then((clients) => clients),
	});

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				Clients
			</Typography>
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>{clients && <ClientTable clients={clients} />}</Paper>
		</Page>
	);
}

export default memo(Clients);
