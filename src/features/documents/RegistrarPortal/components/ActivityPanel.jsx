import React from "react";

const ActivityPanel = ({ activities = [] }) => (
  <aside className="activity-panel">
    <h3>Recent Activity</h3>
    {activities.length > 0 ? (
      activities.map((a) => (
        <div className="activity-item" key={a.id}>
          <div className="activity-dot"></div>
          <div className="activity-content">
            <p>{a.action}</p>
            <small>{a.time}</small>
          </div>
        </div>
      ))
    ) : (
      <p className="no-activity">No recent actions</p>
    )}
  </aside>
);

export default ActivityPanel;
