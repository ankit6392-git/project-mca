import { useEffect, useState } from "react";
import { api } from "../../services/api";

/**
 * Notification Bell Component
 */
export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    api.get("/notifications").then((res) => setNotifications(res.data));
  }, []);

  return (
    <div className="relative">
      🔔 {notifications.length}

      <div className="absolute bg-white shadow p-2 mt-2">
        {notifications.map((n) => (
          <p key={n._id} className="text-sm">
            {n.message}
          </p>
        ))}
      </div>
    </div>
  );
}
