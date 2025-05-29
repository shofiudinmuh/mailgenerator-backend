const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const smtpServer = new SMTPServer({
    authOptional: true, //tidak butuh authentication
    onData(stream, session, callback) {
        simpleParser(stream)
            .then(async (parsed) => {
                const toAddress = parsed.to?.value?.[0]?.address;
                const subject = parsed.subject || '(No Subject)';
                const body = parsed.text || '(No Content';
                const from = parsed.from?.value?.[0]?.address || 'unknown';

                console.log(`Email received for: ${toAddress}`);

                // find the email destination in the database
                const tempEmail = await prisma.tempEmail.findUnique({
                    where: { address: toAddress },
                });

                if (!tempEmail) {
                    console.log(`Email address ${toAddress} not found`);
                    return callback(); //skip and save email
                }

                // save the email to database
                await prisma.email.create({
                    data: {
                        subject,
                        body,
                        from,
                        tempEmailId: tempEmail.id,
                    },
                });

                console.log(`Email saved to inbox for : ${toAddress}`);
                callback();
            })
            .catch((err) => {
                console.error('Error parsing email: ', err);
                callback(err);
            });
    },
    disabledCommands: ['AUTH'], //disable login
});

module.exports = smtpServer;
