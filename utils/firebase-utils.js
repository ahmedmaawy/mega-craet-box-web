const admin = require('firebase-admin');
const serviceAccount = require('../keys/mega-craet-box.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.getHighScores = async function(stage, difficulty, query_limit, server_id) {
    const levelScores = db.collection('level_scores');
    const snapshot = await levelScores.where('difficulty', '==', difficulty)
        .where('level', '==', stage)
        .where('server_id', '==', server_id)
        .orderBy('score', 'desc')
        .limit(query_limit).get();

    if (snapshot.empty) {
        return false;
    } else {
        return snapshot;
    }
};