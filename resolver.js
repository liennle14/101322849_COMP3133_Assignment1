const User = require('./models/User');
const Employee = require('./models/Employee');

const resolvers = {
    Query: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            // Validate user existence and password
            if (!user || user.password !== password) {
                throw new Error('Invalid username or password');
            }
            return {
                message: 'Logged in successfully',
                user: user
            };
        },
        getEmployees: async () => {
            const employees = await Employee.find();
            return employees;
        },
        getEmployeeByID: async (_, { id }) => {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error('No employee with that ID');
            }
            return employee;
        }
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            if (await User.findOne({ username })) {
                throw new Error('User already exists');
            }
            else if (await User.findOne({ email })) {
                throw new Error('Email already exists');
            }
            const user = new User({ username, email, password });
            await user.save();
            return {
                message: 'Signed up successfully',
                user: user
            };
        },
        newEmployee: async (_, { id, firstname, lastname, email, gender, salary }) => { 
            const existingUser = await User.findOne({ email });
            
            if (!existingUser) {
                throw new Error('No user with that email');
            }     
          
            const existingEmployee = await Employee.findOne({ email });
            
            if (existingEmployee) {
                throw new Error('An employee with this email already exists');
            }
        
            const newEmployee = new Employee({ id, firstname, lastname, email, gender, salary });
            await newEmployee.save();
        
            return {
                message: 'New employee saved successfully',
                employee: newEmployee
            };
        },
        updateEmployee: async (_, { id, firstname, lastname, email, gender, salary }) => {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error('No employee with that ID');
            }
            else{
                employee.firstname = firstname;
                employee.lastname = lastname;
                employee.email = email;
                employee.gender = gender;
                employee.salary = salary;
                await employee.save();
                return {
                    message: 'employee updated successfully',
                    employee: employee
                };
            }
        },
        deleteEmployee: async (_, { id }) => {
            try {
                const deletedEmployee = await Employee.findByIdAndDelete(id);
        
                if (!deletedEmployee) {
                    throw new Error('Employee not found');
                }
        
                return {
                    message: 'Employee deleted successfully',
                    employee: deletedEmployee
                };
            } catch (error) {
                throw new Error(`Failed to delete employee: ${error.message}`);
            }
        }
    }
}

module.exports = resolvers;