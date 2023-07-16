import { config } from 'dotenv';
import { app } from './index';

config();
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server is running in port: ${port}`));