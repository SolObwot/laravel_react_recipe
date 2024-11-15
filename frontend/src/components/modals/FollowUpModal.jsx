import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import axios from '../../utils/axiosInstance';

const FollowUpModal = ({ show, onClose, lead }) => {
  const [followUp, setFollowUp] = useState({
    date: '',
    notes: ''
  });

  const handleScheduleFollowUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/leads/${lead.id}/follow-up`, followUp);
      onClose();
    } catch (error) {
      console.error('Follow-up scheduling error:', error);
      // Add error handling here
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Schedule Follow-up</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleScheduleFollowUp}>
              <div className="mb-3">
                <label className="form-label">Follow-up Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={followUp.date}
                  onChange={(e) => setFollowUp({...followUp, date: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={followUp.notes}
                  onChange={(e) => setFollowUp({...followUp, notes: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <Bell className="me-2" size={18} />
                Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;