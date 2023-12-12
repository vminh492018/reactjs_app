export function timeSince(date: Date): string {
  const today: Date = new Date()
  const seconds = Math.floor((+today - +date) / 1000)

  if (seconds < 29)
    // less than 30 seconds ago will show as 'Just now'
    return 'Just now'

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  let counter: number
  for (const i in intervals) {
    counter = Math.floor(seconds / intervals[i])
    if (counter > 0)
      if (counter === 1) {
        return `${counter} ${i} ago` // singular (1 day ago)
      } else {
        return `${counter} ${i}s ago` // plural (2 days ago)
      }
  }

  return 'Just now'
}
