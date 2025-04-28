const parseEnv = () => {
    const envVars = process.env;
    process.env.RSS_API_KEY = '123456';
    process.env.RSS_URL = 'https://example.com';
    process.env.RSS_TIMEOUT = '5000';


    for (const key in envVars) {
        if (key.startsWith('RSS_')) {
            console.log(`${key}=${envVars[key]}`);
        }
    }
};

parseEnv();
