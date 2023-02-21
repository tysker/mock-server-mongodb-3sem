## Node Express MockerServer & MONGO DB

 1. open the project either in VSCode or Intellij
 2. open a terminal in root 
 3. docker-compose up -d
 4. add execute permission on the bash script file if needed
    - chmod +x jsondata.sh
 5. run the bash script to import or delete json data. The first time you run the script you answer with "yes". "no" will delete all data in the db!
    - ./jsondata.sh
 6. open two bash terminals
    - bash (1) = ``` docker container logs --follow server ``` 
    - bash (2) = ``` docker container logs --follow mongoDB ```

```JS
  {
    "student": {
        "name": "string",
            "birthday": "2022-12-12",
            "email": "user@example.com",
            "mobil": 0,
            "gender": "male",
            "address": {
            "street": "string",
                "city": "string",
                "zipCode": "string"
        }
    },
    "education": {
        "name": "multimedia",
            "startDate": "2022-08-01",
            "endDate": "2024-06-31"
    },
    "studentAge": "27"
}

```
OBS. studentAge is a property that gets calculated with help of the birthday property after the data is retrieved from the database. 
The studentAge is only available in the get request and is not a part of the post body request !!!


### For API documentation go to 

Students:
```JS
https://app.swaggerhub.com/apis-docs/tysker/student/1.0.0
```

### Exercises

#### Part 1 Postman

1. Create a new collection in Postman
2. Create a new request in the collection and name it "Get all students"
3. Select the GET method
4. Enter the URL: http://localhost:3000/students
5. Click on the "Send" button
6. Create a new request in the collection and name it "Get student by id"
7. Select the GET method
8. Enter the URL: http://localhost:3000/students/ (enter id here)
9. Click on the "Send" button
10. Create a new request in the collection and name it "Create new student"
11. Select the POST method
12. Enter the URL: http://localhost:3000/students
13. Click on the "Body" tab
14. Select the "raw" radio button
15. Select the "JSON" radio button
16. Enter the following JSON data in the text area:
```JS
  {
    "student": {
      "name": "Garry Mueller",
      "birthday": "1995-11-14",
      "email": "gary@gmail.com",
      "mobil": 999666,
      "gender": "male",
      "address": {
        "street": "35N Railroad",
        "city": "Boston",
        "zipCode": "IO56 3KK"
      }
    },
    "education": {
      "name": "webdesign",
      "startDate": "2021-08-01",
      "endDate": "2023-06-31"
    }
  }
```
17. Click on the "Send" button
18. Create a new request in the collection and name it "Update student by id"
19. Select the PATCH method
20. Enter the URL: http://localhost:3000/students/ (enter id here)
21. Click on the "Body" tab
22. Select the "raw" radio button
23. Select the "JSON" radio button
24. Enter the following JSON data in the text area:
```JS
{
  "student.address.street": "Lyngby Hovedgade 25A"
}
```
25. Click on the "Send" button
26. Create a new request in the collection and name it "Delete student by id"
27. Select the DELETE method
28. Enter the URL: http://localhost:3000/students/ (enter id here)
29. Click on the "Send" button

Remember to save each request in your collection!!
