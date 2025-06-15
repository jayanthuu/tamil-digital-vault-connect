import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './CertificateForm.css';

const fieldLabels: { [key: string]: string } = {
  Name: "What is your name?",
  FatherName: "What is your father's name?",
  DoorNo: "What is your door number?",
  StreetName: "What is your street name?",
  VillageTown: "What is your village or town?",
  Taluk: "What is your taluk?",
  District: "What is your district?",
  Community: "What is your community?",
  CommunityStatus: "What is your community status?",
  GONumber: "What is the G.O. number?",
  GODated: "What is the G.O. date?",
  SerialNo: "What is the serial number?",
  CertificateNumber: "What is the certificate number?"
};

const initialFormData = {
  Name: '',
  FatherName: '',
  DoorNo: '',
  StreetName: '',
  VillageTown: '',
  Taluk: '',
  District: '',
  Community: '',
  CommunityStatus: '',
  GONumber: '',
  GODated: '',
  SerialNo: '',
  CertificateNumber: ''
};

const CertificateForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isVoiceInput, setIsVoiceInput] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper to speak text
  const speakText = (text: string, cb?: () => void) => {
    const synth = window.speechSynthesis;
    const utter = new window.SpeechSynthesisUtterance(text);
    if (cb) utter.onend = cb;
    synth.speak(utter);
  };

  // Helper to listen for answer
  const listenForAnswer = (lang = 'en-IN'): Promise<string> => {
    return new Promise((resolve) => {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech Recognition is not supported in this browser.');
        setIsVoiceInput(false);
        resolve('');
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event: any) => {
        const answer = event.results[0][0].transcript;
        resolve(answer);
      };
      recognition.onerror = () => resolve('');
      recognition.start();
    });
  };

  // Sequentially fill all fields by voice
  const fillFieldsByVoice = async () => {
    let newFormData = { ...initialFormData };
    for (const key of Object.keys(fieldLabels)) {
      await new Promise<void>((res) => {
        speakText(fieldLabels[key], res);
      });
      const answer = await listenForAnswer();
      newFormData[key as keyof typeof newFormData] = answer;
      setFormData({ ...newFormData }); // update UI after each field
    }
    // Read back details
    let details = Object.keys(fieldLabels)
      .map(key => `${key.replace(/([A-Z])/g, ' $1')}: ${newFormData[key as keyof typeof newFormData]}`)
      .join(', ');
    await new Promise<void>((res) => {
      speakText('Here are the details you provided. ' + details + '. Are these details correct? Can I proceed?', res);
    });
    const confirmation = await listenForAnswer();
    if (confirmation.toLowerCase().includes('yes')) {
      generateCertificate(newFormData);
      setIsVoiceInput(false);
    } else {
      setFormData(initialFormData);
      fillFieldsByVoice();
    }
  };

  // PDF generation (uses passed data for voice flow, or state for manual)
  const generateCertificate = (data?: typeof initialFormData) => {
    const d = data || formData;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('GOVERNMENT OF TAMIL NADU', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('COMMUNITY CERTIFICATE', 105, 30, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('This is to certify that:', 20, 45);

    let y = 55;
    doc.text(`Name: Selvi/Selvan ${d.Name}`, 20, y);
    y += 8;
    doc.text(`Father's Name: Thiru ${d.FatherName}`, 20, y);
    y += 8;
    doc.text(`Address: Door No. ${d.DoorNo}, ${d.StreetName} Street,`, 20, y);
    y += 8;
    doc.text(`         ${d.VillageTown} Village/Town, ${d.Taluk} Taluk,`, 20, y);
    y += 8;
    doc.text(`         ${d.District} District, Tamil Nadu.`, 20, y);
    y += 12;
    doc.text(`Community: ${d.Community}`, 20, y);
    y += 8;
    doc.text(`Community Status: ${d.CommunityStatus}`, 20, y);
    y += 8;
    doc.text(`G.O. Number: ${d.GONumber}`, 20, y);
    y += 8;
    doc.text(`G.O. Dated: ${d.GODated}`, 20, y);
    y += 8;
    doc.text(`Serial No.: ${d.SerialNo}`, 20, y);
    y += 8;
    doc.text(`Certificate Number: ${d.CertificateNumber}`, 20, y);
    y += 12;
    doc.text('This is to further certify that the above mentioned person belongs to the', 20, y);
    y += 8;
    doc.text(`${d.Community} community which is recognized as ${d.CommunityStatus}`, 20, y);
    y += 8;
    doc.text('as per the Government Order (Ms.) No. ' + d.GONumber + ', Minority Welfare Department (BCC),', 20, y);
    y += 8;
    doc.text('dated ' + d.GODated + ' vide Serial No. ' + d.SerialNo + '.', 20, y);
    y += 12;
    doc.text('This certificate is digitally signed and does not require any seal or signature.', 20, y);
    y += 12;
    doc.text('Genuineness of the certificate can be verified by:', 20, y);
    y += 8;
    doc.text('Keying in the unique certificate number in the URL:', 20, y);
    y += 8;
    doc.setTextColor(0, 0, 255);
    doc.textWithLink('https://tnedistrict.tn.gov.in/tneda/VerifyCerti.xhtml', 20, y, { url: 'https://tnedistrict.tn.gov.in/tneda/VerifyCerti.xhtml' });
    doc.setTextColor(0, 0, 0);
    y += 12;
    doc.text('Designation: Zonal Deputy Tahsildar', 20, y);
    y += 8;
    doc.text('Date of Issue: ____________________', 20, y);
    y += 16;
    doc.text('Signature:', 150, y);
    doc.save('Community_Certificate.pdf');
  };

  React.useEffect(() => {
    if (isVoiceInput) {
      fillFieldsByVoice();
    }
    // eslint-disable-next-line
  }, [isVoiceInput]);

  return (
    <div className="certificate-container">
      <h2>Community Certificate Generator</h2>
      <form>
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label>{field}:</label>
            <input type="text" name={field} value={formData[field as keyof typeof formData]} onChange={handleChange} />
          </div>
        ))}
      </form>
      <button type="button" onClick={() => setIsVoiceInput(true)}>Voice Input</button>
      <button type="button" onClick={() => generateCertificate()}>Generate Certificate</button>
      {isVoiceInput && (
        <div style={{ marginTop: 16, color: 'green' }}>
          <b>Voice input in progress...</b>
        </div>
      )}
    </div>
  );
};

export default CertificateForm;
