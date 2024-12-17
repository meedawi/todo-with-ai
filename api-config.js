// Encryption utilities
const encryptionKey = 'TodoAppSecretKey2024';

function encrypt(text) {
    return btoa(text.split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ encryptionKey.charCodeAt(i % encryptionKey.length))
    ).join(''));
}

function decrypt(encoded) {
    return atob(encoded).split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ encryptionKey.charCodeAt(i % encryptionKey.length))
    ).join('');
}

// Store encrypted API key
const encryptedKey = "JwRJHzMfGn5WOUokARFVI0hGVH8FOQJXJ0hDOC0lXwIGGgwYRFsAWmFcKiU0EhUJFCYYDiICVBVoYEJHHR4pCAw/BmonDUI0M3wzOlBvY1UMHjBcAxwSOCMpHTMlOR0LZHQfXTgjOzUSA0c0JhskJAA6NzofA3oZNypTGgRdQiU0ACEHAiQIC1d+ZWY+Vi8sERcIAAA3OytAOCI7ZllwGRU5JS4=";

// Function to get API key
window.getApiKey = function() {
    try {
        const decrypted = decrypt(encryptedKey);
        console.log('Full decrypted key:', decrypted);  // This will show us the full key
        return decrypted;
    } catch (error) {
        console.error('Error decrypting API key:', error);
        return null;
    }
};

// Test function to help with encryption
window.testEncryption = function(apiKey) {
    console.log('Original key:', apiKey);
    const encrypted = encrypt(apiKey);
    console.log('Encrypted:', encrypted);
    const decrypted = decrypt(encrypted);
    console.log('Decrypted:', decrypted);
    console.log('Encryption successful:', apiKey === decrypted);
};
