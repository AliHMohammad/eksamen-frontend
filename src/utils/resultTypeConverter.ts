import { format, addMilliseconds, startOfDay } from 'date-fns';

export function convertMilliSeconds(ms: number) {
	const start = startOfDay(new Date(0));
	const date = addMilliseconds(start, ms);
	return format(date, 'HH:mm:ss:SSS');
}

export function convertCentimeters(cm: number) {
	// Calculate meters
	const meters = Math.floor(cm / 100);

	// Calculate remaining centimeters after converting to meters
	const remainingCentimeters = cm % 100;

	// Calculate remaining millimeters after converting to centimeters
	const remainingMillimeters = remainingCentimeters % 10;

	// Format
	let result = "";
	if (meters > 0) {
		result += `${meters} m`;
	}
	if (remainingCentimeters > 0) {
		if (result !== "") {
			result += `, `;
		}
		result += `${remainingCentimeters} cm`;
	}
	if (remainingMillimeters > 0) {
		if (result !== "") {
			result += `, `;
		}
		result += `${remainingMillimeters} mm`;
	}

	return result;
}

export function convertMillimeters(millimeters: number) {
	// Calculate meters
	const meters = Math.floor(millimeters / 1000);

	// Calculate remaining millimeters after converting to meters
	const remainingMillimeters = millimeters % 1000;

	// Calculate centimeters from remaining millimeters
	const centimeters = Math.floor(remainingMillimeters / 10);

	// Remaining millimeters after converting to centimeters
	const remainingMillimetersAfterCm = remainingMillimeters % 10;

	// Format the result
	let result = "";
	if (meters > 0) {
		result += `${meters} m`;
	}
	if (centimeters > 0) {
		if (result !== "") {
			result += `, `;
		}
		result += `${centimeters} cm`;
	}
	if (remainingMillimetersAfterCm > 0) {
		if (result !== "") {
			result += `, `;
		}
		result += `${remainingMillimetersAfterCm} mm`;
	}

	return result;
}