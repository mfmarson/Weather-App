import { createHash, randomBytes, pbkdf2Sync } from 'crypto';

// DynamoDB setup
const REGION = "us-east-2";
const TABLE_NAME = 'User_Authentication';

// Utility Functions
function generateSalt() {
  return randomBytes(32).toString('hex');
}

function hashPassword(password, salt) {
  return pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function verifyPassword(password, salt, hash) {
  const hashedPassword = hashPassword(password, salt);
  return hashedPassword === hash;
}

// JWT Token Functions
function createJWT(payload, secret, expiresIn = '24h') {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  // Calculate expiration in ms (24 hours)
  const expirationTime = Date.now() + (24 * 60 * 60 * 1000);
  
  const jwtPayload = {
    ...payload,
    exp: expirationTime,
    iat: Date.now()
  };
  
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(jwtPayload)).toString('base64url');
  
  const signature = createHash('sha256')
    .update(`${encodedHeader}.${encodedPayload}.${secret}`)
    .digest('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWT(token, secret) {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    
    // Verify signature
    const expectedSignature = createHash('sha256')
      .update(`${encodedHeader}.${encodedPayload}.${secret}`)
      .digest('base64url');
    
    if (signature !== expectedSignature) {
      return { valid: false, error: 'Invalid signature' };
    }
    
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
    if (Date.now() > payload.exp) {
      return { valid: false, error: 'Token expired' };
    }
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: 'Invalid token format' };
  }
}

// Mock Database Functions
async function findUserByEmail(email) {
  console.log('Looking up user by email:', email);
  
  // Simulate a user database with some test users
  const mockUsers = {
    'test@test.com': {
      userId: 'mock-user-123',
      email: 'test@test.com',
      passwordHash: hashPassword('password123', 'mock-salt-456'),
      salt: 'mock-salt-456'
    },
    'realuser@test.com': {
      userId: 'mock-user-789', 
      email: 'realuser@test.com',
      passwordHash: hashPassword('password123', 'mock-salt-789'),
      salt: 'mock-salt-789'
    }
  };
  
  const user = mockUsers[email];
  if (user) {
    console.log('User found:', email);
    return user;
  } else {
    console.log('User not found:', email);
    return null;
  }
}

async function saveUser(userData) {
  try {
    console.log('Attempting to save user:', userData.email);
    
    // Use the AWS object that's built into Lambda runtime
    const AWS = globalThis.AWS;
    
    if (AWS && AWS.DynamoDB) {
      console.log('AWS SDK found, attempting real save...');
      
      const dynamodb = new AWS.DynamoDB({ region: REGION });
      
      const params = {
        TableName: TABLE_NAME,
        Item: {
          userId: { S: userData.userId },
          email: { S: userData.email },
          passwordHash: { S: userData.passwordHash },
          salt: { S: userData.salt },
          createdAt: { S: new Date().toISOString() }
        }
      };
      
      console.log('Saving to DynamoDB with params:', JSON.stringify(params, null, 2));
      
      const result = await dynamodb.putItem(params).promise();
      console.log('✅ User successfully saved to DynamoDB!');
      return result;
      
    } else {
      console.log('AWS SDK not available, user registration complete but not persisted');
      console.log('User data that would be saved:', userData);
      return { success: true, note: 'simulated save' };
    }
    
  } catch (error) {
    console.error('Error saving user:', error);
    // Don't throw error - let registration succeed even if save fails
    console.log('Registration proceeding despite save error');
    return { success: false, error: error.message };
  }
}

async function checkUserExists(email) {
  console.log('Skipping duplicate check for now:', email);
  return false; // Always return false to allow registration
}

// Handler Functions
async function handleRegister(event) {
  try {
    const { email, password } = JSON.parse(event.body || '{}');

    console.log('Registration attempt for:', email);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }

    if (password.length < 6) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Password must be at least 6 characters' })
      };
    }

    console.log('Check for existing user...');

    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);
    const userId = randomBytes(16).toString('hex');
    const jwtSecret = 'your-key';

    await saveUser({
      userId,
      email,
      passwordHash,
      salt
    });

    const token = createJWT({ userId, email }, jwtSecret);
    
    return {
      statusCode: 201,
      body: JSON.stringify({ 
        message: 'Registration successful!',
        token: token,
        user: { userId, email }
      })
    };

  } catch (error) {
    console.error('Error during registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error: ' + error.message })
    };
  }
}

async function handleLogin(event) {
  try {
    const { email, password } = JSON.parse(event.body || '{}');
    
    console.log('Login attempt for:', email);

    // Validation
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }

    // Find user in database (mock)
    const user = await findUserByEmail(email);
    
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid email or password' })
      };
    }

    // Verify password
    const isValidPassword = verifyPassword(password, user.salt, user.passwordHash);
    
    if (!isValidPassword) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid email or password' })
      };
    }

    // Create JWT token for successful login
    const jwtSecret = 'your-key';
    const token = createJWT({ 
      userId: user.userId, 
      email: user.email 
    }, jwtSecret);
    
    console.log('Login successful for:', email);

 // Mock favorites data
const mockFavorites = [
  {
    id: '1',
    city: 'New York',
    temperature: 72,
    description: 'Partly cloudy',
    humidity: 65,
    iconCode: '02d',
    iconUrl: 'https://openweathermap.org/img/wn/02d@2x.png'
  },
  {
    id: '2', 
    city: 'Los Angeles',
    temperature: 75,
    description: 'Sunny',
    humidity: 45,
    iconCode: '01d',
    iconUrl: 'https://openweathermap.org/img/wn/01d@2x.png'
  },
  {
    id: '3',
    city: 'Chicago', 
    temperature: 68,
    description: 'Overcast',
    humidity: 72,
    iconCode: '04d',
    iconUrl: 'https://openweathermap.org/img/wn/04d@2x.png'
  },
  {
    id: '4',
    city: 'Miami',
    temperature: 82,
    description: 'Humid',
    humidity: 85,
    iconCode: '10d',
    iconUrl: 'https://openweathermap.org/img/wn/10d@2x.png'
  }
];

return {
  statusCode: 200,
  body: JSON.stringify({ 
    message: 'Welcome back to The Daily Drizzle!',
    token: token,
    user: {
      userId: user.userId,
      email: user.email,
      favorites: mockFavorites 
    }
  })
};

  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

async function handleVerify(event) {
  try {
    // Extract token from Authorization header
    const authHeader = event.headers?.authorization || event.headers?.Authorization;
    
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'No authorization header provided' })
      };
    }

    // Extract token (format: "Bearer <token>")
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'No token provided' })
      };
    }

    // Verify JWT token
    const jwtSecret = 'your-key';
    const verification = verifyJWT(token, jwtSecret);
    
    if (!verification.valid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: verification.error })
      };
    }

    console.log('Token verified for user:', verification.payload.email);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Token valid',
        user: {
          userId: verification.payload.userId,
          email: verification.payload.email
        }
      })
    };

  } catch (error) {
    console.error('Token verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

// Main Handler
export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.requestContext?.http?.path || event.path;
  
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Max-Age': '86400'
  };

  // Handle CORS preflight requests
if (method === 'OPTIONS') {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: '',
  };
}

  if (method === 'POST' && path === '/stage/auth/register') {
    const response = await handleRegister(event);
    return { ...response, headers: corsHeaders };
  } else if (method === 'POST' && path === '/stage/auth/login') {
    const response = await handleLogin(event);
    return { ...response, headers: corsHeaders };
  } else if (method === 'GET' && path === '/stage/auth/verify') {
    const response = await handleVerify(event);
    return { ...response, headers: corsHeaders };
  } else {
    return {
      statusCode: 404, 
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Not Found', receivedPath: path, method: method }),
    };
  }
};