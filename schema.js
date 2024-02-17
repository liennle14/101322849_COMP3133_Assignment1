const { gql } = require('apollo-server-express');
const User = require('./models/User');
const Employee = require('./models/Employee');

const typeDefs = gql `
    type User {
        username: String!
        email: String!
        password: String!
    }  
    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }  
    input UpdateEmployeeInput {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }
    type Query {
        login(username: String!, password: String!): User!
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): [Employee]
    }
    type Mutation {
        signup(username: String!, email: String!, password: String!): User!
        newEmployee(firstname: String!, lastname: String!, email: String!, gender: String!, salary: String!): Employee!
        updateEmployee(input: UpdateEmployeeInput!): Employee!
        deleteEmployee(id: ID!): Employee!

    }
`
module.exports = typeDefs;