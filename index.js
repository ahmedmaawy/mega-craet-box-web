const express = require('express');
const app = express();
const local_port = 3000;
const server_port = process.env.PORT || local_port;
const server_id = process.env.SERVER_ID || '';
const firebaseUtils = require('./utils/firebase-utils')
const path = require('path');

// Config for views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Config for assets
app.use('/res', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  // Easy
  const stage1_easy = firebaseUtils.getHighScores(1, 0, 20, server_id);
  const stage2_easy = firebaseUtils.getHighScores(2, 0, 20, server_id);
  const stage3_easy = firebaseUtils.getHighScores(3, 0, 20, server_id);
  // Medium
  const stage1_medium = firebaseUtils.getHighScores(1, 1, 20, server_id);
  const stage2_medium = firebaseUtils.getHighScores(2, 1, 20, server_id);
  const stage3_medium = firebaseUtils.getHighScores(3, 1, 20, server_id);
  // Hard
  const stage1_hard = firebaseUtils.getHighScores(1, 2, 20, server_id);
  const stage2_hard = firebaseUtils.getHighScores(2, 2, 20, server_id);
  const stage3_hard = firebaseUtils.getHighScores(3, 2, 20, server_id);

  let values = Promise.all(
    [
      stage1_easy, stage1_medium, stage1_hard,
      stage2_easy, stage2_medium, stage2_hard,
      stage3_easy, stage3_medium, stage3_hard,
    ]
  ).then((values) => {
    // Compile
    const data = {
      'stage_1': {
        'easy': values[0],
        'medium': values[1],
        'hard': values[2]
      },
      'stage_2': {
        'easy': values[3],
        'medium': values[4],
        'hard': values[5]
      },
      'stage_3': {
        'easy': values[6],
        'medium': values[7],
        'hard': values[8]
      }
    }

    // Render
    res.render('index', {
      subject: 'EJS template engine',
      name: 'our template',
      link: 'https://google.com',
      data: data
    });
  });
});

app.listen(server_port, () => {
  console.log(`Example app listening on port ${server_port}`)
});