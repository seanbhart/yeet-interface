export function formatTimestamp(timestamp: number): string {
    const now = Date.now() / 1000; // current time in seconds
    const diff = now - timestamp; // difference in seconds

    if (diff < 60) {
        // 1 minute
        return "now";
    } else if (diff < 3600) {
        // 1 hour
        const minutes = Math.max(Math.round(diff / 60), 1);
        return `${minutes}m`;
    } else if (diff < 86400) {
        // 1 day
        const hours = Math.max(Math.round(diff / 3600), 1);
        return `${hours}h`;
    } else if (diff < 604800) {
        // 1 week
        const days = Math.max(Math.round(diff / 86400), 1);
        return `${days}d`;
    } else if (diff < 3024000) {
        // 5 weeks
        const weeks = Math.max(Math.round(diff / 604800), 1);
        return `${weeks}w`;
    } else {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
}
