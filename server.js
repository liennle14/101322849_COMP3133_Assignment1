const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Assuming you have a model named 'Employee' defined
const Employee = require('./models/Employee');

mongoose.connect("mongodb+srv://dbuser:mypassword@cluster0.wihv2ix.mongodb.net/comp3133?retryWrites=true&w=majority", {
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

const app = express();

app.use(cors());
app.use(express.json());

// Get all employees
app.get('/employee-list', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create an employee
app.post('/add-employee', async (req, res) => {
    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/view-employee/:email', async (req, res) => {
  const email = req.params.email;
  try {
      const employee = await Employee.findOne({ email: email });
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.put('/update-employee/:email', async (req, res) => {
  try {
    const newData = req.body;
    const email = req.params.email;
    let updatedEmployee = await Employee.findOneAndUpdate({ email: email }, newData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).send("No employee found");
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/delete-employee/:email', async (req, res) => {
  const email = req.params.email;
  try {
      const deletedEmployee = await Employee
          .findOneAndDelete({ email }); 
      if (!deletedEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(deletedEmployee);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/signup', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
      return res.status(400).json({message: 'Please provide email and password'});
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }
  
  // Match password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }
});


app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = (req, res) => {
    app.handle(req, res);
  };