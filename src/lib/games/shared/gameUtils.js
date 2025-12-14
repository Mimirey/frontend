// Shuffle array (Fisher-Yates)
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Format time (seconds to MM:SS)
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Calculate percentage
export function calculatePercentage(value, total) {
  return Math.round((value / total) * 100);
}

// Get random items from array
export function getRandomItems(array, count) {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}