const config = {
    server_host: 'localhost',
    server_port: 3003,
    database_url: 'mongodb://localhost/db',
    prefix: '/api',
    verion: '1.0',
    access_token_secret: '269262d1ce5a13ff880ab731ddb044d47035031d3468b9fb79092db3aea6eaddb4cdb5469f8a34c973353bd8c76358d2bd86926a49edbcfce620d53a5c0a2691',
    access_token_expires_in: '24h',
    without_check_token: [
        '/api/user/login', 
        '/api/user/tokenLogin', 
        '/api/user/register',
        '/api/todo'
    ],
};

module.exports = config;