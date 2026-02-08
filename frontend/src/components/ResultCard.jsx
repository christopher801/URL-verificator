import React from 'react';

function ResultCard({ result, onNewScan }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'SAFE':
        return 'safe';
      case 'SUSPICIOUS':
        return 'suspicious';
      case 'MALICIOUS':
        return 'malicious';
      default:
        return 'suspicious';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SAFE':
        return 'bi-shield-check';
      case 'SUSPICIOUS':
        return 'bi-exclamation-triangle';
      case 'MALICIOUS':
        return 'bi-shield-x';
      default:
        return 'bi-question-circle';
    }
  };

  const getRecommendation = (status) => {
    switch (status) {
      case 'SAFE':
        return 'This website appears to be safe. Continue browsing normally.';
      case 'SUSPICIOUS':
        return 'Proceed with caution. Avoid entering sensitive information.';
      case 'MALICIOUS':
        return 'DO NOT VISIT THIS WEBSITE. It may harm your device or steal your information.';
      default:
        return 'Use caution when visiting unknown websites.';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`cyber-result-card status-${result.status.toLowerCase()}`}>
      <div className="result-header">
        <div className={`result-status-badge ${getStatusColor(result.status)}`}>
          <i className={`bi ${getStatusIcon(result.status)} me-2`}></i>
          {result.status}
        </div>
        
        <div className="result-score">
          <div className="score-label">SECURITY SCORE</div>
          <div className="score-value">
            {result.status === 'SAFE' ? '90-100' : 
             result.status === 'SUSPICIOUS' ? '40-70' : '0-30'}
          </div>
        </div>
      </div>

      <div className="result-url">
        <strong>Scanned URL:</strong><br />
        <code>{result.url}</code>
      </div>

      <div className="result-details">
        <h4><i className="bi bi-clipboard-data"></i> SECURITY ANALYSIS</h4>
        <p>{result.details}</p>
        
        {result.threats && result.threats.length > 0 && (
          <div className="threat-list mt-3">
            <h5>Detected Threats:</h5>
            <ul className="threat-items">
              {result.threats.map((threat, index) => (
                <li key={index} className="threat-item">
                  <i className="bi bi-exclamation-octagon-fill text-danger me-2"></i>
                  {threat.type}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.warnings && result.warnings.length > 0 && (
          <div className="warning-list mt-3">
            <h5>Security Warnings:</h5>
            <ul className="warning-items">
              {result.warnings.map((warning, index) => (
                <li key={index} className="warning-item">
                  <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="result-recommendation">
        <h4><i className="bi bi-lightbulb"></i> SECURITY RECOMMENDATION</h4>
        <p>{getRecommendation(result.status)}</p>
      </div>

      {result.note && (
        <div className="result-note">
          <small>
            <i className="bi bi-info-circle"></i> {result.note}
          </small>
        </div>
      )}

      <div className="result-footer">
        <div className="result-timestamp">
          <i className="bi bi-clock"></i> Scan completed: {formatDate(result.timestamp)}
        </div>
        
        <div className="result-actions">
          <button 
            className="cyber-btn cyber-btn-sm"
            onClick={onNewScan}
          >
            <i className="bi bi-plus-circle me-2"></i>
            SCAN ANOTHER URL
          </button>
          
          <button className="cyber-btn cyber-btn-secondary cyber-btn-sm">
            <i className="bi bi-download me-2"></i>
            DOWNLOAD REPORT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;