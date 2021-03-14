require('dotenv').config();

const getClient = (request = {}) => {
    return {
        ClientId: request.header('ClientId') || request.input('ClientId', ''),
        ClientSecret : request.header('ClientSecret') || request.input('ClientSecret', '')
    }
}

const getAuthorization = (request = {}) => {
    let auth = request.header('Authorization') || `Bearer ${request.cookie('auth_token') || request.input('Authorization')}`;
    return { Authorization: auth }
}


const getSystemKey = () => process.env.SYSTEM_KEY || "";


const API = {
    API_AUTHENTICATION: process.env.API_AUTHENTICATION || "",
}

// exportart 
module.exports = { 
    getClient,
    getAuthorization,
    getSystemKey,
    API,
};