import {app} from "./app.js";
import { PORT } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
async function startServer() {
    await connectDatabase();
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch((err)=>{
    console.error('[Server]: Failed to start.', err);
    process.exit(1);
});