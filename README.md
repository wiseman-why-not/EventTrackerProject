## Event Tracker Project

#### Week 12-14 Homework Project for Skill Distillery

### Overview

Crime Tracker, keeps track of crimes in neighborhood in the greater Denver area. 

### REST API Endpoints

TODO - table of api URIs, and HTTP verbs

| HTTP Verb | URI                  | Request Body | Response Body | Purpose |
|-----------|----------------------|--------------|---------------|---------|
| GET       | `/api/crimes`      |              | Collection of representations of all _crimes_ resources | **List** or **collection** endpoint |
| GET       | `/api/crimes/2`   |              | Representation of _crimes_ `2` | **Retrieve** endpoint |
| POST      | `/api/crimes`      | Representation of a new _crimes_ resource | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/crimes/2`   | Representation of a new version of _crimes_ `2` | | **Replace** endpoint |
| DELETE    | `/api/crimes/2`   |              | | **Delete** route |

### Technologies Used

+ Java
+ Java Persistence Api (JPA)
+ Spring Boot
+ MySQL

### Lessons Learned

+ Still getting use Representational State Transfer (REST)
+ Understanding that JPA, to create a Java entity class that models the tables in my database. Mapping my classes using JPA
+ Using Spring Rest annotations and using Spring Data JPA to perform all CRUD operations.
