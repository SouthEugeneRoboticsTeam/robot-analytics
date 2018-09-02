import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyAuW56b2mXlUlmYJ-ZtMy5QWFnz5tv5QZA',
    authDomain: 'robotanalytics-1e12b.firebaseapp.com',
    databaseURL: 'https://robotanalytics-1e12b.firebaseio.com',
    projectId: 'robotanalytics-1e12b',
    storageBucket: 'robotanalytics-1e12b.appspot.com',
    messagingSenderId: '476381608160'
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });
