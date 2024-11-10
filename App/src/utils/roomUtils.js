export const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  export const getUserId = () => {
    // Get browser-specific information
    const browserInfo = [
      navigator.userAgent,     // Browser user agent
      navigator.language,      // Browser language
      navigator.platform,      // Browser platform (OS)
      new Date().getTimezoneOffset(), // User's timezone offset
    ].join('');
  
    // Generate a simple hash (32-bit) using a bitwise operation
    let hash = 0;
    for (let i = 0; i < browserInfo.length; i++) {
      const char = browserInfo.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32-bit integer
    }
  
    // Convert to a positive integer and return as a unique ID
    return Math.abs(hash).toString(16); // Convert to hexadecimal string
  }

  export const getRandomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16); // Generates a number between 0 and 0xFFFFFF
    return `#${color.padStart(6, '0')}`; // Ensures the color is exactly 6 characters long
  }