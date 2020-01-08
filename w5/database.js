require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const md5 = require('md5');

let username = process.env.DB_USER
let password = process.env.DB_PASS
let dbhost = process.env.DB_HOST_PORT
let database = process.env.DB_NAME
// const md5test = md5(database)
// console.log(username, password, dbhost, database, md5test)
// // let url = `mongodb://${username}:${encodeURIComponent(password)}@${dbhost}/${database}`
// //mongodb+srv://user1:<password>@cluster0-lm8xp.azure.mongodb.net/test
// const url1 = `mongodb+srv://${username}:${password}@${dbhost}/${database}`
// // Create a new MongoClient
// const client = new MongoClient(url1, { useUnifiedTopology: true });
// console.log(client)
// // Use connect method to connect to the Server


// client.connect(function(err) {
//   if (err) {
//       console.error('Error', err)
//   } else {
//     console.log("Connected successfully to server")
//   }console.error('Error', err)
//   console.error('tesst', err)
//   client.close()
// })
// console.log("End")

//   const db = client.db(dbName);

// TODO
  // use a database using dbName
  // create a collections name `users`
  // insert at least two users:
  /*
      {
          "fullName": "A Thi No",
          "username": "athino",
          "pass": "#%^%$&", <-- encrypted using md5
      }
   */
// document sample: https://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/

const listUsers = [
  {
  "fullName": "A Thi No",
  "username": "athino",
  "pass": md5('password1')
  },
  {
  "fullName": "B Chi Pheo",
  "username": "bchipheo",
  "pass": md5('password2')
  },
  {
  "fullName": "C Ba Kien",
  "username": "C Ba Kien",
  "pass": md5('password3')
  },
]
const insertDocuments = (db, colectionName, listObjects, callback) => {
  const collection = db.collection(colectionName);
  collection.insertMany(listObjects, function(err, result) {
    console.log("Insert to", colectionName);
    callback(result);
  });
}


const uri = `mongodb+srv://${username}:${password}@${dbhost}/${database}?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  if (err) console.error(err)
  console.log("Connected successfully to server");
  // const db = client.db("test_db")
  // insertDocuments(db, 'test_collection', listUsers,  function() {
  //   client.close();
  // })
  const collection = client.db("test").collection("test_db.test_collection");
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
  });
  // console.log(collection)
  // collection.insertMany(listUsers, (err, res) => {
  //   if (err) console.log(err);
  //   else console.log('success')
  //   // console.log("1 document inserted");
  //   client.close();
  // })
  // collection.insertOne({"tesst": "tesst1"})
  // .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
  // .catch(err => console.error(`Failed to insert item: ${err}`))
  client.close();
});