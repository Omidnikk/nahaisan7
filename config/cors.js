const corsOptions = {
    origin: [
        'http://localhost:3000', // example frontend URL, you can use an array to specify multiple domains
    ],
    credentials: true, // important for cookies and session management
};

export default corsOptions;