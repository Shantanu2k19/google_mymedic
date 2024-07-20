// utils.ts

// Function to generate a unique username
export function generateUniqueUsername(email: string): string {
  const localPart = email.split('@')[0];
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  const uniqueTimestamp = `${year}${month}${day}${hour}${minute}${second}`;
  return `${localPart}_${uniqueTimestamp}`;
}

// Function to format a date
export function formatDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getUTCFullYear()).slice(-2); // Get last 2 digits of the year
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
  return `${day}-${month}-${year}, ${hours}:${minutes}`;
}
