// utils.js

/**
 * Truncate a string to a specified length and append '...'
 * @param {string} str - The string to be truncated.
 * @param {number} num - The maximum length of the truncated string.
 * @returns {string} - The truncated string with '...' appended if it exceeds the maximum length.
 */
export function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }
  
  /**
   * Round a number to a specified number of decimal places.
   * @param {number} num - The number to be rounded.
   * @param {number} decimals - The number of decimal places.
   * @returns {number} - The rounded number.
   */
  // export function roundOffNumber(num, decimals) {
  //   const factor = Math.pow(10, decimals);
  //   return Math.round(num * factor) / factor;
  // }

  export function roundOffNumber(num, decimals) {
    return num.toFixed(decimals);
  }