module.exports= {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: "database/user.db"
        },
        migrations:{
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds'
        }
    }
}