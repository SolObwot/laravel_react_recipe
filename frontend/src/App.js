import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Plus } from 'lucide-react';
import axios from './utils/axiosInstance';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import FollowUpModal from './components/modals/FollowUpModal';
import CreateLeadModal from './components/modals/CreateLeadModal';
import LeadTable from './components/LeadTable';

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showCreateLeadModal, setShowCreateLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
      fetchLeads();
    }
  }, [isLoggedIn]);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setLeads([]);
  };

  const handleScheduleFollowUp = (lead) => {
    setSelectedLead(lead);
    setShowFollowUpModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lead Management System</h1>
        <div>
          {!isLoggedIn ? (
            <>
              <button 
                className="btn btn-outline-primary me-2"
                onClick={() => setShowLoginModal(true)}
              >
                <LogIn className="me-2" size={18} />
                Login
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setShowRegisterModal(true)}
              >
                <UserPlus className="me-2" size={18} />
                Register
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-success me-2"
                onClick={() => setShowCreateLeadModal(true)}
              >
                <Plus className="me-2" size={18} />
                New Lead
              </button>
              <button 
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <LeadTable 
          leads={leads}
          onScheduleFollowUp={handleScheduleFollowUp}
        />
      )}

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        setIsLoggedIn={setIsLoggedIn}
        credentials={credentials}
        setCredentials={setCredentials}
      />
      <RegisterModal
        show={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
      <FollowUpModal
        show={showFollowUpModal}
        onClose={() => setShowFollowUpModal(false)}
        lead={selectedLead}
        onFollowUpScheduled={fetchLeads}
      />
      <CreateLeadModal
        show={showCreateLeadModal}
        onClose={() => setShowCreateLeadModal(false)}
        onLeadCreated={fetchLeads}
      />
    </div>
  );
};

export default App;