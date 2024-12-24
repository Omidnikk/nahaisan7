import admin from 'firebase-admin';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 const serviceAccount = path.join(__dirname, '../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
   const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (!VAPID_PRIVATE_KEY) {
    console.error("Missing environment variable VAPID_PRIVATE_KEY");
    process.exit(1);
}
async function sendNotification(token, title, body) {
    try {
       const message = {
           notification: {
             title: title,
               body: body,
           },
            token: token,
           };

       const response = await admin.messaging().send(message);
       console.log('Notification sent successfully:', response);
    return 'success'
       } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
       }
}
export { admin, VAPID_PRIVATE_KEY,sendNotification};