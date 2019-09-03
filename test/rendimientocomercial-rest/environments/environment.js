//availables environments DESA (default) and PROD

module.exports = {
    db_host: process.env.PROD == 1 ? 'localhost' : 'desa-server.local',
    db_user: process.env.PROD == 1 ? 'sa' : 'sa',
    db_password: process.env.PROD == 1 ? 'linux' : 'linux',
    db_database: process.env.PROD == 1 ? 'agence_performance' : 'agence_performance',
    assets_dir: 'assets/',
    url_prefix: process.env.PROD == 1 ? '/rendimientocomercial-rest' : ''
}
