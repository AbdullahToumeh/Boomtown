module.exports = `

  scalar Date
  scalar Upload

  enum Role {
    VIEWER  
  }
  
  directive @auth(
    requires: Role = VIEWER,
  ) on OBJECT | FIELD_DEFINITION
  
  type Item @auth(requires: VIEWER) {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: Date!
    borrower: User
  }

  type User @auth(requires: VIEWER) {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File @auth(requires: VIEWER) {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    title: String!
    id: String!
  }

  input AssignedBorrower {
    id: String! 
  }
 
  input SignupInput {
    fullname: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
  }

  type Query {
    uploads: [File]
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    login(user: LoginInput!): User!
    logout: Boolean!
    signup(user: SignupInput!): User!
    addItem (item: NewItemInput!, image: Upload!): Item 
  }
`
