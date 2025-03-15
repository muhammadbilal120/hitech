import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from '../Title';
import './Contact.css';
import { toast, ToastContainer } from 'react-toastify';
import { backendUrl } from '../../../../admin/src/App';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; 

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFeedbackMessage('File size exceeds the allowed limit.');
        setIsLoading(false);
        return;
      }
      formData.append('attachment', file);
    }

    try { const response = await fetch(backendUrl +'/api/hitech/send-email', 
      { method: 'POST', body: formData,});





      if (response.ok) {
        // setFeedbackMessage('Message sent successfully!');
        setSubject('');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        
        toast.success('Message sent successfully!')
        setFile(null);
      } else {
        const responseBody = await response.json();
        setFeedbackMessage(responseBody.message || 'Failed to send message.');
      }
    // } catch (error) {
    //   console.error('There was an error sending the email:', error);
    //   setFeedbackMessage('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center text-2xl pt-10">
        <Title text1={"Contact"} text2={"US"} />
      </div>

      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-7">
            <h6 className="text-start my-1">
              <strong> LEAVE US A MESSAGE </strong>
            </h6>
            <hr />
            <form className="text-start my-4" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      className="form-control rounded-1"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control rounded-1"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control rounded-1"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone</label>
                <PhoneInput
                  country={"pk"}
                  value={phone}
                  onChange={handlePhoneChange}
                  inputClass="form-control"
                  containerClass="mb-3"
                  inputStyle={{ width: "100%" }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message">Your Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="consent"
                  required
                />
                <label className="form-check-label" htmlFor="consent">
                  I agree to the processing of the e-mail address and Phone
                  number provided above by HiTech for direct contact.
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="marketing"
                />
                <label className="form-check-label" htmlFor="marketing">
                  I agree to receive marketing information via e-mail.
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="attachment">Attachment</label>
                <input
                  type="file"
                  className="form-control"
                  id="attachment"
                  onChange={(e) => setFile(e.target.files[0])}
                  key={file ? file.name : 'file-input'}
                />
              </div>
              <button
                type="submit"
                className="btn mb-5 text-white bg-gray-800 hover:bg-customGreen"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
            {feedbackMessage && <p className="feedback">{feedbackMessage}</p>}
          </div>
          <div className="col-md-5">
            <div className="map-container">
              <iframe
                title="Google Map"
                // src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13611.268734827372!2d74.3048615!3d31.4742148!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190310aedd4ed9%3A0x55a30390118b3775!2sJss%20Devs!5e0!3m2!1sen!2s!4v1724075865463!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
};

export default Contact;
