import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEvent, memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { StyledButton } from '../../components/Button';
import { Form } from '../../components/Form';
import Page from '../../components/Page';
import { Toast } from '../../components/Toast';
import { LangSwitcher } from '../../i18n/LangSwitcher';
import { createClient, getClients } from '../../services/api';
import ClientTable from './ClientTable';

function Clients() {
	const intl = useIntl();
	const [query, setQuery] = useState('');
	const [openForm, setOpenForm] = useState(false);
	const [openToast, setOpenToast] = useState(false);

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['clients'],
		queryFn: () => getClients().then((clients) => clients),
	});

	const { mutate: create } = useMutation({
		mutationFn: (newClient: Client) => createClient(newClient),
		onSuccess: () => {
			setOpenForm(false);
			setOpenToast(true);
			refetch();
		},
	});

	const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setQuery(value);
	};

	const handleOpenForm = () => {
		setOpenForm(true);
	};

	const handleCloseForm = () => {
		setOpenForm(false);
	};

	const handleCloseToast = () => {
		setOpenToast(false);
	};

	let clients = data ?? [];

	if (query) {
		clients = clients.filter((client) => {
			if (
				client.firstName.toLowerCase().includes(query.toLowerCase()) ||
				client.lastName.toLowerCase().includes(query.toLowerCase())
			) {
				return true;
			}

			return false;
		});
	}

	if (error) return <Box>An error has occurred</Box>;

	return (
		<Page>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={2}
			>
				<Typography
					variant='h4'
					fontWeight={700}
					sx={{ textAlign: 'start' }}
				>
					{intl.formatMessage({ id: 'app.title' })}
				</Typography>

				<LangSwitcher />
			</Stack>

			<Stack direction='row' justifyContent='space-between'>
				<TextField
					placeholder={intl.formatMessage({ id: 'app.search' })}
					value={query}
					type='text'
					size='small'
					sx={{ background: '#fff' }}
					onChange={handleChangeQuery}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>

				<StyledButton variant='contained' onClick={handleOpenForm}>
					{intl.formatMessage({ id: 'app.create' })}
				</StyledButton>
			</Stack>

			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				{isPending ? (
					<Box>Loading...</Box>
				) : (
					<ClientTable query={query} clients={clients} />
				)}
			</Paper>

			<Form
				open={openForm}
				handleClose={handleCloseForm}
				handleCreate={create}
			/>

			<Toast open={openToast} handleCloseToast={handleCloseToast} />
		</Page>
	);
}

export default memo(Clients);
