import firebase from 'firebase/app';
const db = firebase.firestore();

// Reset tracks collection
db.collection("tracks").delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});