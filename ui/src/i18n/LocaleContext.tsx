import { createContext, Dispatch, SetStateAction } from 'react';

export const LocaleContext = createContext<{
	locale: string;
	setLocale: Dispatch<SetStateAction<string>>;
}>({
	// Defaults that we'll override in a moment.
	locale: '',
	setLocale: () => {},
});
