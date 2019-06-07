# Political Parties

Political Parties API with Express and SQL.

### Political Parties API

- name: String
- tagline: String
- supporters: Number
  > has_many: candidates

```
CREATE TABLE parties(
id SERIAL PRIMARY KEY,
name VARCHAR(255),
tagline VARCHAR(255),
supporters INTEGER,
created_at TIMESTAMP,
updated_at TIMESTAMP);
```

### Candidates API

- fname: String
- lname: String
- age: Number
- verified: Boolean
- political_party_id: Foreign Key
  > has_many: candidates
  > belongs_to: a party

```
CREATE TABLE candidates(
id SERIAL PRIMARY KEY,
fname VARCHAR(255),
lname VARCHAR(50),
dob DATE,
verified BOOLEAN DEFAULT false,
term INTEGER,
party_id INTEGER REFERENCES parties (id),
office_id INTEGER REFERENCES offices (id),
created_at TIMESTAMP,
updated_at TIMESTAMP);

```

### Offices API

- title: String
- term: Number
  > has_many: candidates

```
CREATE TABLE offices(id SERIAL PRIMARY KEY,
title VARCHAR(50),
term INTEGER);
```
