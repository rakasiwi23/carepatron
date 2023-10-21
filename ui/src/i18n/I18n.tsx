import { ReactNode, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { defaultLocale, locales } from './i18n-config';
import { LocaleContext } from './LocaleContext';

interface Props {
	children: ReactNode;
}
export default function I18n({ children }: Props) {
	const [locale, setLocale] = useState(defaultLocale);

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<IntlProvider
				locale={locale}
				defaultLocale={defaultLocale}
				messages={locales[locale].messages}
			>
				{children}
			</IntlProvider>
		</LocaleContext.Provider>
	);
}
