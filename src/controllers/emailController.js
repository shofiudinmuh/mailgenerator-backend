const { PrismaClient } = require('@prisma/client');
const generateEmail = require('../utils/mailGenerator');
const prisma = new PrismaClient();

exports.generateEmail = async (req, res) => {
    try {
        let address;
        let exists;

        do {
            address = generateEmail();
            exists = await prisma.tempEmail.findUnique({ where: { address } });
        } while (exists);

        const newEmail = await prisma.tempEmail.create({
            data: { address },
        });

        res.json({
            id: newEmail.id,
            address: newEmail.address,
            createdAt: newEmail.createdAt,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to generate email' });
    }
};
