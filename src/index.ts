import app from './server';
import colors from 'colors';

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(colors.bgCyan.bold(`Server is running on http://localhost:${PORT}`));
})