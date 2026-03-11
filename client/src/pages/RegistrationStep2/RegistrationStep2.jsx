import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegistrationStep2.scss';

// SVG Icons
const UserIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
);

const BikeIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6-.6 0-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4.8.8 2 1.9 3.1 3V19h1.5v-6.3l-1.6-1.5zm8.7-1C16.7 9.5 14.5 11.7 14.5 14.5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" /></svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
);

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button type="button" className={`accordion-header ${isOpen ? 'open' : ''}`} onClick={onClick}>
        {title}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {content}
      </div>
    </div>
  );
};

const RegistrationStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialData = location.state || {
    fullName: '',
    phone: '',
    email: ''
  };

  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    dob: '',
    city: '',
    emergencyContact: '',
    mileage: '',
    disciplines: [],
    goals: '',
    otherClubs: '',
    instagram: '',
    strava: '',
    garmin: '',
  });

  const [agreed, setAgreed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({ ...prev, disciplines: [...prev.disciplines, value] }));
    } else {
      setFormData(prev => ({
        ...prev,
        disciplines: prev.disciplines.filter(d => d !== value)
      }));
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const isFormValid = () => {
    return (
      formData.dob &&
      formData.city &&
      formData.emergencyContact &&
      formData.mileage &&
      formData.otherClubs &&
      formData.strava &&
      agreed
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }
  };

  if (isSuccess) {
    return (
      <div className="registration-step2" style={{ backgroundImage: 'url("/image/paternWire.png")' }}>
        <div className="registration-step2__container success-message">
          <CheckIcon className="check-icon" />
          <h2>Thank you!</h2>
          <p>Your application has been submitted successfully.<br />We will contact you shortly.</p>
          <img src="/image/Kit.png" alt="Arcadia CC Kit" />
          <div style={{ marginTop: '30px' }}>
            <button className="submit-btn" onClick={() => navigate('/')}>Return to Homepage</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-step2" style={{ backgroundImage: 'url("/image/paternWire.png")' }}>
      <div className="registration-step2__container">
        <div className="registration-step2__header">
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("/image/paternWire.png")', backgroundSize: 'cover', opacity: 0.15, pointerEvents: 'none', zIndex: 1 }}></div>
          <h1 style={{ position: 'relative', zIndex: 2 }}>Join the Club</h1>
          <p style={{ position: 'relative', zIndex: 2 }}>Complete your profile and confirm the annual contract.</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-step2__content">

          {/* ----- PERSONAL DATA ----- */}
          <div className="registration-step2__block">
            <h2 className="registration-step2__block-title"><UserIcon /> Personal Data</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} disabled />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled />
              </div>
              <div className="form-group">
                <label>Date of Birth <span>*</span></label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>City of Residence <span>*</span></label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Odessa" required />
              </div>
              <div className="form-group full-width">
                <label>Emergency Contact <span>*</span></label>
                <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} placeholder="Name and Phone number" required />
              </div>
            </div>
          </div>

          {/* ----- SPORTS PROFILE ----- */}
          <div className="registration-step2__block">
            <h2 className="registration-step2__block-title"><BikeIcon /> Sports Profile</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Approx. mileage last year (km) <span>*</span></label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} placeholder="e.g. 5000" required />
              </div>
              <div className="form-group">
                <label>Are you a member of other sports clubs? <span>*</span></label>
                <div className="checkbox-group" style={{ marginTop: '10px' }}>
                  <label>
                    <input type="radio" name="otherClubs" value="Yes" checked={formData.otherClubs === 'Yes'} onChange={handleInputChange} required /> Yes
                  </label>
                  <label>
                    <input type="radio" name="otherClubs" value="No" checked={formData.otherClubs === 'No'} onChange={handleInputChange} required /> No
                  </label>
                </div>
              </div>
              <div className="form-group full-width">
                <label>Preferred Disciplines</label>
                <div className="checkbox-group">
                  {['Road', 'Gravel', 'MTB', 'Cyclocross'].map(discipline => (
                    <label key={discipline}>
                      <input
                        type="checkbox"
                        value={discipline}
                        checked={formData.disciplines.includes(discipline)}
                        onChange={handleCheckboxChange}
                      /> {discipline}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group full-width">
                <label>Main sports goals for the upcoming season</label>
                <textarea name="goals" value={formData.goals} onChange={handleInputChange} placeholder="Tell us about your goals..."></textarea>
              </div>
            </div>
          </div>

          {/* ----- TELEMETRY & SOCIALS ----- */}
          <div className="registration-step2__block">
            <div className="form-grid">
              <div className="form-group">
                <label>Strava Link <span>*</span></label>
                <input type="url" name="strava" value={formData.strava} onChange={handleInputChange} placeholder="https://www.strava.com/athletes/..." required />
              </div>
              <div className="form-group">
                <label>Instagram Link</label>
                <input type="url" name="instagram" value={formData.instagram} onChange={handleInputChange} placeholder="https://instagram.com/..." />
              </div>
              <div className="form-group full-width">
                <label>Garmin Connect Link</label>
                <input type="url" name="garmin" value={formData.garmin} onChange={handleInputChange} placeholder="https://connect.garmin.com/..." />
              </div>
            </div>
          </div>

          {/* ----- ANNUAL CONTRACT ----- */}
          <div className="registration-step2__block">
            <h2 className="registration-step2__block-title"><DocumentIcon /> Annual Contract</h2>

            <div className="contract-box">
              <div className="contract-box-intro">
                Welcome to Arcadia Cycling Club! Our club is a community of like-minded people united by a passion for cycling.
                By joining our ranks, you become the face of the club. To maintain the high level of our team and respect for our partners,
                each member assumes the following obligations:
              </div>

              <div className="accordion">
                <AccordionItem
                  title="Point 1. Team Spirit and Ethics"
                  isOpen={openAccordion === 1}
                  onClick={() => toggleAccordion(1)}
                  content={
                    <ul>
                      <li><strong>Mutual assistance:</strong> I pledge to help, respect and support my clubmates both in training and competitions, and beyond.</li>
                      <li><strong>Culture of behavior:</strong> I pledge to observe traffic rules and behave correctly towards other road users, understanding that in the club kit I represent the entire Arcadia Cycling Club team.</li>
                    </ul>
                  }
                />
                <AccordionItem
                  title="Point 2. Equipment and Training"
                  isOpen={openAccordion === 2}
                  onClick={() => toggleAccordion(2)}
                  content={
                    <ul>
                      <li><strong>Club Kit:</strong> I pledge to attend all official club training sessions, rides and competitions exclusively in the current club kit and paraphernalia.</li>
                      <li><strong>Safety:</strong> I pledge to always use a bicycle helmet during rides. Riding without a helmet at club events is strictly prohibited.</li>
                    </ul>
                  }
                />
                <AccordionItem
                  title="Point 3. Media and Partners"
                  isOpen={openAccordion === 3}
                  onClick={() => toggleAccordion(3)}
                  content={
                    <ul>
                      <li><strong>Support for partners:</strong> I pledge to tag the official club accounts (@arcadiacyclingclub) and its current partners in my social media posts and stories when posting content from training and races.</li>
                      <li><strong>Consent to the use of media:</strong> I give my consent to Arcadia Cycling Club to use my photos and videos from club events free of charge for publication on social networks, on the club's website and in promotional materials for partners.</li>
                    </ul>
                  }
                />
                <AccordionItem
                  title="Point 4. Financial and Legal Conditions"
                  isOpen={openAccordion === 4}
                  onClick={() => toggleAccordion(4)}
                  content={
                    <ul>
                      <li><strong>Membership fee:</strong> I confirm my readiness to pay the mandatory annual membership fee of 250 euros.</li>
                      <li><strong>Sports license:</strong> I pledge to issue/provide a valid sports license for the current year, necessary to participate in official starts.</li>
                      <li><strong>Responsibility for health:</strong> I confirm that I have no medical contraindications to cycling, and I take personal responsibility for the state of my health during training.</li>
                    </ul>
                  }
                />
              </div>
            </div>

            <div className="agreement-checkbox">
              <label>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                <span>I have carefully read and agree to the rules and conditions of annual membership in Arcadia Cycling Club.</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={!isFormValid()}>
            Submit Application & Join Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationStep2;
