import React from 'react';
import { Bell } from 'lucide-react';

const ScheduleFollowUpButton = ({ onClick }) => (
  <button 
    className="btn btn-sm btn-outline-primary me-2"
    onClick={onClick}
  >
    <Bell size={16} className="me-1" />
    Schedule Follow-up
  </button>
);

export default ScheduleFollowUpButton;