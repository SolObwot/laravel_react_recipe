import React from 'react';
import { Bell, Calendar } from 'lucide-react';

const LeadTable = ({ leads, onScheduleFollowUp, onUpdateFollowUp }) => {
  // Function to get the latest follow-up status
  const getLatestFollowUpStatus = (followUps) => {
    if (!followUps || followUps.length === 0) return { status: 'No Follow-up', className: 'bg-secondary' };
    
    const latest = followUps.reduce((latest, current) => 
      new Date(current.date) > new Date(latest.date) ? current : latest
    );

    const statusMap = {
      'Pending': 'bg-warning',
      'Completed': 'bg-success',
      'Cancelled': 'bg-danger',
      'Scheduled': 'bg-info'
    };

    return {
      status: latest.status,
      className: statusMap[latest.status] || 'bg-secondary'
    };
  };

  return (
    <div className="card">
      <div className="card-header bg-light">
        <h3 className="card-title mb-0">Leads</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Follow-up Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const followUpStatus = getLatestFollowUpStatus(lead.followUps);

                return (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>
                      <span className={`badge ${followUpStatus.className}`}>
                        {followUpStatus.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => onScheduleFollowUp(lead)}
                        >
                          <Bell size={16} className="me-1" />
                          Schedule Follow-up
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => onUpdateFollowUp(lead)}
                        >
                          <Calendar size={16} className="me-1" />
                          Update Follow-up Date
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;