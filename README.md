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
| PUT       | `/api/crimes/2`   | Representation of a new version of _crimes_ `2` | Update an existing crime in the database | **Replace** endpoint |
| DELETE    | `/api/crimes/2`   |              | Delete a crime from the database| **Delete** route |

### Technologies Used

+ Java
+ Java Persistence Api (JPA)
+ Spring Boot
+ MySQL

### Lessons Learned

+ Still getting use Representational State Transfer (REST)
+ Understanding that JPA, to create a Java entity class that models the tables in my database. Mapping my classes using JPA
+ Using Spring Rest annotations and using Spring Data JPA to perform all CRUD operations.
+ Week 13 homework was using JSON and SpringREST as it is handling JSON responses with JavaScript.
+ Building out the front end for this application using Javascript.
+ Adding scripts to a web application
+ Send asynchronous requests to Java controllers with JavaScript's `XMLHttpRequest
+ Consume and parse JSON responses with JavaScript
+ Build HTML with JavaScript
+ Send POST/PUT/DELETE requests with XMLHttpRequest
