import * as functions from 'firebase-functions';
import * as mkdirp from 'mkdirp-promise';
import * as storage from '@google-cloud/storage';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as admin from 'firebase-admin';
import * as process from 'child-process-promise';
import * as firebase from 'firebase';

admin.initializeApp(functions.config().firebase);

// if you need to use the Firebase Admin SDK, uncomment the following:
// import * as admin from 'firebase-admin'

// Create and Deploy Cloud Function with TypeScript using script that is
// defined in functions/package.json:
//    cd functions
//    npm run deploy

export let helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!\n\n");
});


// Include a Service Account Key to use a Signed URL


// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
export let generateThumbnail = functions.storage.object().onChange(event => {
    // File and directory paths.
    const filePath: string = event.data.name;
    const fileDir: string = path.dirname(filePath);
    const fileName: string = path.basename(filePath);
    const thumbFilePath: string = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);
    const sprintId = fileDir.split('/').pop();

    console.log(filePath);
    console.log(fileDir);
    console.log(fileName);
    console.log(sprintId);

    // Exit if this is triggered on a file that is not an image.
    if (!event.data.contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return;
    }

    // Exit if the image is already a thumbnail.
    if (fileName.startsWith(THUMB_PREFIX)) {
        console.log('Already a Thumbnail.');
        return;
    }

    // Exit if this is a move or deletion event.
    if (event.data.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    }

    // Cloud Storage files.
    const bucket = storage({keyFilename: 'ya-scrum-firebase-adminsdk-ng7wn-afa9e95c09.json'}).bucket(event.data.bucket);
    const file = bucket.file(filePath);
    const thumbFile = bucket.file(thumbFilePath);

    // Create the temp directory where the storage file will be downloaded.
    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        return file.download({ destination: tempLocalFile });
    }).then(() => {
        console.log('The file has been downloaded to', tempLocalFile);
        // Generate a thumbnail using ImageMagick.
        return process.spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile]);
    }).then(() => {
        console.log('Thumbnail created at', tempLocalThumbFile);
        // Uploading the Thumbnail.
        return bucket.upload(tempLocalThumbFile, { destination: thumbFilePath });
    }).then(() => {
        console.log('Thumbnail uploaded to Storage at', thumbFilePath);
        // Once the image has been uploaded delete the local files to free up disk space.
        fs.unlinkSync(tempLocalFile);
        fs.unlinkSync(tempLocalThumbFile);
        //Get the Signed URLs for the thumbnail and original image.
        const config = {
          action: 'read',
          expires: '03-01-2500'
        };
        return Promise.all([
          thumbFile.getSignedUrl(config),
          file.getSignedUrl(config)
        ]);
    }).then(results => {

        console.log('Got Signed URLs.');
        const thumbResult = results[0];
        const originalResult = results[1];
        const thumbFileUrl = thumbResult[0];
        const fileUrl = originalResult[0];
        // Add the URLs to the Database
        //return admin.database().ref('images').push({background: fileUrl, thumbnail: thumbFileUrl});
        return admin.database().ref('sprints/' + sprintId).update({background: fileUrl, thumbnail: thumbFileUrl});

    }).then(() => console.log('Thumbnail URLs saved to database.'));
});
