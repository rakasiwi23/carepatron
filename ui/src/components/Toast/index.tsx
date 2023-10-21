import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { Transition } from '../Transition';

interface Props {
	open: boolean;
	handleCloseToast: () => void;
}

export const Toast = ({ open, handleCloseToast }: Props) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleCloseToast}
			TransitionComponent={Transition}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
		>
			<Alert severity='success' variant='filled'>
				<AlertTitle>Success</AlertTitle>
				New client — <strong>created!</strong>
			</Alert>
		</Snackbar>
	);
};
