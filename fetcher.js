const paths = process.argv.slice(2);
const fs = require('fs')
const request = require('request');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

request(paths[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  if(error) {
      console.log('The http request appears to be invalid!!!');
      process.exit();
  }

    if (fs.existsSync(paths[1])) {
        console.log('File exists')
        rl.question('File exists, do you want to overwrite the while or exit app?', (answer) => {
            if (answer === 'Y' || answer === 'y') {
                fs.writeFile(paths[1], body, (err) => {
                    console.log(`Downloaded and overwritten ${response.headers['content-length']} bytes to ${paths[1]}`);
                });
            } 
            rl.close();
        })
    } else {
        fs.writeFile(paths[1], body, (err) => {
            if (err) {
                console.log('Invalid path!!!');
                throw err;
            }
            console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${paths[1]}`);
            process.exit();
        });
    }
  
});


