import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UrlForm from './components/UrlForm';
import ResultCard from './components/ResultCard';
import './App.css';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScanComplete = (result) => {
    setScanResult(result);
    setIsLoading(false);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
    setScanResult(null);
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
    setError(null);
  };

  const handleNewScan = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="cyber-container">
        <section className="cyber-hero">
          <h1 className="mono">SITEGUARD VERIFICATOR</h1>
          <p className="cyber-subtitle">
            Advanced Cyber Security Scanner • Real-Time Threat Detection • Enterprise-Grade Protection
          </p>
          <div className="cyber-stats">
            <span className="stat-item">
              <i className="bi bi-shield-check"></i> 24/7 Monitoring
            </span>
            <span className="stat-item">
              <i className="bi bi-lightning-charge"></i> Instant Results
            </span>
            <span className="stat-item">
              <i className="bi bi-globe"></i> Global Database
            </span>
          </div>
        </section>

        <div className="cyber-form-container">
          <UrlForm 
            onScanComplete={handleScanComplete}
            onError={handleError}
            onLoading={handleLoading}
            onNewScan={handleNewScan}
          />
          
          {isLoading && (
            <div className="cyber-loading-container">
              <div className="cyber-loader"></div>
              <p className="cyber-loading-text">
                <span className="blink">SCANNING URL</span><br />
                Analyzing security threats...
              </p>
            </div>
          )}

          {error && (
            <div className="cyber-alert">
              <h3 className="cyber-alert-title">
                <i className="bi bi-exclamation-triangle"></i> SCAN FAILED
              </h3>
              <p>{error}</p>
              <button 
                className="cyber-btn cyber-btn-sm"
                onClick={() => setError(null)}
              >
                TRY AGAIN
              </button>
            </div>
          )}

          {scanResult && !isLoading && !error && (
            <ResultCard 
              result={scanResult}
              onNewScan={handleNewScan}
            />
          )}

          {!scanResult && !isLoading && !error && (
            <div className="cyber-tips">
              <h4><i className="bi bi-info-circle"></i> TIPS FOR SAFE BROWSING:</h4>
              <ul>
                <li>Always check URLs before clicking on links</li>
                <li>Look for HTTPS in the address bar</li>
                <li>Be cautious of shortened URLs</li>
                <li>Keep your browser and security software updated</li>
              </ul>
            </div>
          )}
        </div>

        <section className="cyber-features">
          <h2 className="text-center mb-5">ADVANCED SECURITY FEATURES</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h3>Malware Detection</h3>
              <p>Real-time scanning for viruses, ransomware, and spyware</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-person-badge"></i>
              </div>
              <h3>Phishing Protection</h3>
              <p>Identify deceptive websites attempting to steal information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
              <h3>Behavior Analysis</h3>
              <p>Advanced algorithms detect suspicious patterns</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="cyber-footer">
        <div className="container">
          <p className="footer-text">
            <span className="mono">SITEGUARD VERIFICATOR v1.0</span><br />
            <span className="footer-subtext">
              © {new Date().getFullYear()} Cyber Security Labs • All scans are confidential and secure
            </span>
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              <i className="bi bi-shield-check"></i> Privacy Policy
            </a>
            <a href="#" className="footer-link">
              <i className="bi bi-file-text"></i> Terms of Service
            </a>
            <a href="#" className="footer-link">
              <i className="bi bi-envelope"></i> Contact Security Team
            </a>
          </div>
          <p className="footer-disclaimer">
            <i className="bi bi-exclamation-triangle"></i> This tool provides security recommendations 
            based on available data. Always exercise caution when browsing.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;