// Import class and datatype-collection from sequlize-module
const {Sequelize, DataTypes} = require('sequelize')

// Create a sequlize instance with sqlite-options
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/mydb.sqlite'
})

// Create our first model, this should mirror the structure of the database
// These models should be contained in separate files in the models-directory
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
})

// If you want sequelize to create the tables, call this first
// sequelize.sync()


async function run(){
  // Build a new user with corresponding attributes
  const user = await User.build({
    email: 'kalle',
    passwordHash: 'gibberish',
    name: 'Olof',
    age: 1337
  })
  // Persist the user to the database
  await user.save()

  // Fetch a user with specific ID
  const user = await User.findOne({id: 1})
  user.name = "The the name" // Change an attribute
  await user.save() // Persist the change to the database
}





run()