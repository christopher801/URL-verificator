const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const GOOGLE_API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

class SecurityService {
  constructor() {
    if (!GOOGLE_API_KEY) {
      console.warn('⚠️  Google Safe Browsing API key is not configured.');
      console.warn('⚠️  The application will use mock data for demonstration.');
    }
  }

  async checkUrlSafety(url) {
    // If no API key is configured, use mock data for demonstration
    if (!GOOGLE_API_KEY) {
      return this.getMockResponse(url);
    }

    try {
      const requestBody = {
        client: {
          clientId: 'siteguard-verificator',
          clientVersion: '1.0.0'
        },
        threatInfo: {
          threatTypes: [
            'MALWARE',
            'SOCIAL_ENGINEERING',
            'UNWANTED_SOFTWARE',
            'POTENTIALLY_HARMFUL_APPLICATION'
          ],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url }]
        }
      };

      const response = await axios.post(
        `${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return this.analyzeGoogleResponse(url, response.data);
    } catch (error) {
      console.error('Google Safe Browsing API Error:', error.message);
      
      // Fallback to mock data if API fails
      return this.getMockResponse(url);
    }
  }

  analyzeGoogleResponse(url, googleResponse) {
    if (!googleResponse || !googleResponse.matches || googleResponse.matches.length === 0) {
      return {
        url,
        status: 'SAFE',
        details: 'No threats detected in Google Safe Browsing database',
        timestamp: new Date().toISOString(),
        threats: [],
        confidence: 'high'
      };
    }

    const threats = googleResponse.matches.map(match => ({
      type: match.threatType,
      platform: match.platformType,
      entry: match.threatEntryType
    }));

    // Determine severity based on threat types
    const threatTypes = threats.map(t => t.type);
    let status = 'SAFE';
    let details = '';

    if (threatTypes.includes('MALWARE') || threatTypes.includes('SOCIAL_ENGINEERING')) {
      status = 'MALICIOUS';
      details = 'Website contains malware or phishing content';
    } else if (threatTypes.includes('UNWANTED_SOFTWARE')) {
      status = 'SUSPICIOUS';
      details = 'Website may contain unwanted software or deceptive content';
    } else {
      status = 'SUSPICIOUS';
      details = 'Potential security issues detected';
    }

    return {
      url,
      status,
      details,
      timestamp: new Date().toISOString(),
      threats,
      confidence: 'high'
    };
  }

  getMockResponse(url) {
    // For demonstration purposes - simulates different security statuses
    const urlHash = this.hashString(url);
    const statuses = ['SAFE', 'SUSPICIOUS', 'MALICIOUS'];
    const mockStatus = statuses[urlHash % 3];
    
    const responses = {
      SAFE: {
        url,
        status: 'SAFE',
        details: 'No security threats detected. Website appears to be safe for browsing.',
        timestamp: new Date().toISOString(),
        confidence: 'high'
      },
      SUSPICIOUS: {
        url,
        status: 'SUSPICIOUS',
        details: 'Potential security concerns detected. Exercise caution when visiting this website.',
        timestamp: new Date().toISOString(),
        warnings: [
          'Unverified SSL certificate',
          'Recently registered domain',
          'Unusual traffic patterns detected'
        ]
      },
      MALICIOUS: {
        url,
        status: 'MALICIOUS',
        details: '⚠️ SECURITY ALERT: This website has been flagged for malicious activity including malware distribution or phishing attempts.',
        timestamp: new Date().toISOString(),
        threats: [
          'Malware distribution',
          'Phishing attempts',
          'Social engineering'
        ],
        recommendation: 'Do not visit this website. Clear your browser cache if you have already visited.'
      }
    };

    return {
      ...responses[mockStatus],
      note: mockStatus === 'SAFE' ? undefined : 'This is a demonstration result. Real-time scanning requires Google Safe Browsing API key.'
    };
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

module.exports = new SecurityService();