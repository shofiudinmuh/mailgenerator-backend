const generateEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvqxyz0123456789';
    const name = Array.from(
        { length: 10 },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return `${name}@mymail.dev`;
};

module.exports = generateEmail;
