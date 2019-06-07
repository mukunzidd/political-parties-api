# Political Parties

Political Parties API with Express and SQL.

### Political Parties API

- name: String
- tagline: String
- supporters: Number
  > has_many: candidates

### Candidates API

- fname: String
- lname: String
- age: Number
- verified: Boolean
- political_party_id: Foreign Key
  > has_many: candidates
  > belongs_to: a party

### Offices API

- title: String
- term: Number
  > has_many: candidates
