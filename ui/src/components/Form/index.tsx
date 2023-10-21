import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UseMutateFunction } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useIntl } from 'react-intl';
import { Transition } from '../../components/Transition';
import { StyledButton } from '../Button';

interface Props {
	open: boolean;
	handleClose: () => void;
	handleCreate: UseMutateFunction<void, Error, Client, unknown>;
}
export const Form = ({ open, handleClose, handleCreate }: Props) => {
	const intl = useIntl();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			'first-name': { value: string };
			'last-name': { value: string };
			email: { value: string };
			'phone-number': { value: string };
		};
		const firstName = target['first-name'].value;
		const lastName = target['last-name'].value;
		const email = target.email.value;
		const phoneNumber = target['phone-number'].value;

		handleCreate({
			id: 'something random',
			firstName,
			lastName,
			email,
			phoneNumber,
		});
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<DialogTitle
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{intl.formatMessage({ id: 'app.form_title' })}{' '}
				<CloseIcon
					onClick={handleClose}
					sx={{ opacity: 0.5, cursor: 'pointer' }}
				/>
			</DialogTitle>
			<Divider sx={{ marginBottom: 4 }} />

			<Box component='form' onSubmit={handleSubmit}>
				<DialogContent sx={{ paddingTop: 0 }}>
					<Stack direction='row' alignItems='center' mb={3} pl={1}>
						<Badge badgeContent={1} color='primary' />
						<Typography ml={2} fontWeight={700} variant='body2'>
							{intl.formatMessage({
								id: 'app.form_personal_details',
							})}
						</Typography>
					</Stack>
					<TextField
						id='first-name'
						label={intl.formatMessage({
							id: 'app.form_first_name',
						})}
						type='text'
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						required
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						id='last-name'
						label={intl.formatMessage({ id: 'app.form_last_name' })}
						type='text'
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						required
					/>

					<Stack
						direction='row'
						alignItems='center'
						mt={4}
						mb={3}
						pl={1}
					>
						<Badge badgeContent={2} color='primary' />
						<Typography ml={2} fontWeight={700} variant='body2'>
							{intl.formatMessage({
								id: 'app.form_contact_details',
							})}
						</Typography>
					</Stack>
					<TextField
						id='email'
						label={intl.formatMessage({ id: 'app.form_email' })}
						type='email'
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						required
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						id='phone-number'
						label={intl.formatMessage({
							id: 'app.form_phone_number',
						})}
						type='tel'
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						required
					/>
				</DialogContent>

				<DialogActions sx={{ padding: '0 24px 24px 24px' }}>
					<StyledButton type='submit' variant='contained'>
						{intl.formatMessage({ id: 'app.form_create_client' })}
					</StyledButton>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
