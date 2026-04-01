import React, { useState, useRef } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🎤 Recording
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🎤 Start Recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  // 🎤 Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    console.log("Audio:", audioURL);

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setAudioURL(null);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">

        {/* Hero */}
        <section className="contact-hero">
          <h1>Get In Touch</h1>
          <p>Send message or record your voice </p>
        </section>

        {/* Form Section */}
        <div className="contact-content">
          <div className="contact-form-section">

            <h2>Send us a Message</h2>

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Message Sent Successfully!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">

                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />

                {/* 🎤 Record Section */}
                <div className="record-section">
                  <label>🎤 Record Voice (Optional)</label>

                  {!isRecording ? (
                    <button type="button" onClick={startRecording} className="record-btn">
                      Start Recording
                    </button>
                  ) : (
                    <button type="button" onClick={stopRecording} className="stop-btn">
                      Stop Recording
                    </button>
                  )}

                  {audioURL && <audio controls src={audioURL}></audio>}
                </div>

                {/* 📞 Call Section */}
                <div className="call-section">
                  <p>📞 Need help? Call us directly</p>
                  <a href="tel:+911234567890" className="call-btn">
                    📞 +91 12345 67890
                  </a>
                </div>

                <button type="submit" className="btn-primary">
                  Send Message
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;