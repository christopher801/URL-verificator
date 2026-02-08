import React, { useState } from 'react';
import axios from 'axios';

function UrlForm({ onScanComplete, onError, onLoading, onNewScan }) {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const validateUrl = (inputUrl) => {
    try {
      // Add http:// if no protocol is specified
      if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        inputUrl = 'https://' + inputUrl;
      }
      
      new URL(inputUrl);
      return inputUrl;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validatedUrl = validateUrl(url.trim());
    if (!validatedUrl) {
      onError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    setIsValidating(true);
    setHasScanned(true);
    onLoading(true);

    try {
      const response = await axios.post('/api/verify', {
        url: validatedUrl
      });

      onScanComplete(response.data);
    } catch (error) {
      console.error('Scan Error:', error);
      
      if (error.response) {
        // Server responded with error
        onError(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        // No response received
        onError('Unable to connect to the security server. Please check your connection.');
      } else {
        // Request setup error
        onError('An error occurred while setting up the request.');
      }
    } finally {
      setIsValidating(false);
      onLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setHasScanned(false);
    onNewScan();
  };

  return (
    <div className="cyber-form">
      <h2 className="text-center mb-4">
        <i className="bi bi-search"></i> URL SECURITY SCANNER
      </h2>
      <p className="text-center text-secondary mb-4">
        Enter any website URL to check for malware, phishing, and security threats
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="cyber-input-group">
          <label htmlFor="url-input" className="cyber-input-label">
            <i className="bi bi-link-45deg"></i> ENTER WEBSITE URL
          </label>
          <input
            id="url-input"
            type="text"
            className="cyber-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com or example.com"
            disabled={isValidating}
            required
          />
          <div className="input-hint">
            <i className="bi bi-info-circle"></i> Enter full URL including http:// or https://
          </div>
        </div>

        <div className="d-grid gap-2">
          {!hasScanned ? (
            <button
              type="submit"
              className="cyber-btn"
              disabled={isValidating || !url.trim()}
            >
              {isValidating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  SCANNING...
                </>
              ) : (
                <>
                  <i className="bi bi-shield-check me-2"></i>
                  SCAN URL FOR THREATS
                </>
              )}
            </button>
          ) : (
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="cyber-btn"
                disabled={isValidating}
              >
                {isValidating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    RE-SCANNING...
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    SCAN AGAIN
                  </>
                )}
              </button>
              <button
                type="button"
                className="cyber-btn cyber-btn-secondary"
                onClick={handleReset}
                disabled={isValidating}
              >
                <i className="bi bi-plus-circle me-2"></i>
                NEW SCAN
              </button>
            </div>
          )}
        </div>
      </form>

      {!hasScanned && (
        <div className="cyber-examples mt-4">
          <p className="text-center text-muted">
            <small>
              <i className="bi bi-lightbulb"></i> Try scanning: 
              <span className="example-url"> https://google.com</span> • 
              <span className="example-url"> https://github.com</span> • 
              <span className="example-url"> amazon.com</span>
            </small>
          </p>
        </div>
      )}
    </div>
  );
}

export default UrlForm;