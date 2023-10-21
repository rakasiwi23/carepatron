import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { locales } from './i18n-config';
import { LocaleContext } from './LocaleContext';

export const LangSwitcher = () => {
	const intl = useIntl();
	const { locale, setLocale } = useContext(LocaleContext);

	return (
		<FormControl>
			<InputLabel id='demo-multiple-name-label'>
				{intl.formatMessage({ id: 'app.language' })}
			</InputLabel>
			<Select
				value={locale}
				input={
					<OutlinedInput
						label={intl.formatMessage({ id: 'app.language' })}
					/>
				}
				onChange={(e) => setLocale(e.target.value)}
				size='small'
			>
				{Object.keys(locales).map((loc) => (
					<MenuItem value={loc} key={loc}>
						{locales[loc].name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
