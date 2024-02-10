import { browser } from '$app/environment';

export function getLocalStorage(key: string) {
	if (!browser) return null;

	const storedData = localStorage.getItem(key);
	return storedData ? JSON.parse(storedData) : null;
}

export function setLocalStorage(key: string, data: any) {
	if (!browser) return null;

	localStorage.setItem(key, JSON.stringify(data));
}
