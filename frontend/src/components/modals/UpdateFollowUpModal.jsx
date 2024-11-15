import React from 'react';
import { Check, X } from 'lucide-react';

const UpdateFollowUpModal = ({ show, onClose, onUpdateStatus, followUp }) => {
  const handleStatusUpdate = (status) => {
    onUpdateStatus(followUp.id, status);
    onClose();
  };

  return (
    <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Follow-up Status</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="d-grid gap-2">
              <button 
                className="btn btn-success"
                onClick={() => handleStatusUpdate('completed')}
              >
                <Check className="me-2" size={18} />
                Mark as Completed
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleStatusUpdate('missed')}
              >
                <X className="me-2" size={18} />
                Mark as Missed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFollowUpModal;