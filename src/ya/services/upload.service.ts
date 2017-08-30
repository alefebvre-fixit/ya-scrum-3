import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

import { Upload } from '../models';

@Injectable()
export class UploadService {

    private basePath = '/uploads';
    uploads: FirebaseListObservable<Upload[]>;

    constructor(private firebaseApp: FirebaseApp, private db: AngularFireDatabase) { }

    pushUpload(upload: Upload) {
        
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = this.firebaseApp.storage();

        console.log(storage);

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        console.log(storageRef);
        

        const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // upload in progress
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                // upload failed
                console.log(error);
            },
            () => {
                // upload success
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.saveFileData(upload);
            }
        );
    }
    
    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
                this.deleteFileStorage(upload.name)
            })
            .catch(error => console.log(error))
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string) {
        let storageRef = this.firebaseApp.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete()
    }

}