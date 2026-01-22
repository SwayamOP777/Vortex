export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Get query parameters
  const { key, type, term } = req.query;
  
  // Validate input
  if (!term) {
    return res.status(400).json({ 
      success: false, 
      error: 'Mobile number is required' 
    });
  }
  
  try {
    // Call original API
    const apiUrl = `https://codexvortex.vercel.app/api?key=${key || 'Ravan'}&type=${type || 'mobile'}&term=${term}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Change credit field
    data.credit = "@PurelyYour";
    
    // Return modified data
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}
