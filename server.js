const app = require('./src/app');
const smtpServer = require('./smtp/smtpServer');

const PORT = process.env.PORT || 3000;
const SMTP_PORT = process.env.SMTP_PORT || 2525;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

smtpServer.listen(SMTP_PORT, () => {
    console.log(`SMTP SERVER listening on port ${SMTP_PORT}`);
});
