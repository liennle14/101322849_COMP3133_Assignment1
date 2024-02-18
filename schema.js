const { gql } = require('apollo-server-express');
const User = require('./models/User');
const Employee = require('./models/Employee');

const typeDefs = gql `
    type User {
        username: String
        email: String
        password: String
    }  
    type Employee {
        firstname: String
        lastname: String
        email: String
        gender: String
        salary: Float
    }  
    input UpdateEmployeeInput {
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }
    type LoginResponse {
        message: String
        user: User
    }
    type EmployeeResponse {
        message: String
        employee: Employee
    }
    type Query {
        login(username: String!, password: String!): LoginResponse!
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee!
    }
    type Mutation {
        signup(username: String!, email: String!, password: String!): LoginResponse!
        newEmployee(firstname: String!, lastname: String!, email: String!, gender: String!, salary: String!): EmployeeResponse!
        updateEmployee(input: UpdateEmployeeInput!): EmployeeResponse!
        deleteEmployee(id: ID!): EmployeeResponse!

    }
`
module.exports = typeDefs;