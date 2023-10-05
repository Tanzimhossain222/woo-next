/**
 * This Function used for number format with 2 decimal places.
 * 
 * @param {Number} num 
 * @returns number
 */
export const ToFixedNum = (num) => {
	if (typeof num === 'number') {
		return num.toFixed(2);
	}
	return '';
}