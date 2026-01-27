/**
 * AnnouncementTicker
 * ------------------
 * Displays scrolling government notices
 */
export default function AnnouncementTicker() {
  return (
    <div className="bg-red-700 text-white text-sm py-2 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee px-4">
        🔔 Scheduled maintenance on 20 Feb (02:00 – 04:00 AM) &nbsp; | &nbsp;
        New sanitation department onboarded &nbsp; | &nbsp;
        Upload images for faster complaint resolution
      </div>
    </div>
  );
}
