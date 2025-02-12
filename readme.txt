curl -X POST http://localhost:3000/api/register \
     -H "Content-Type: application/json" \
     -d '{
           "name": "athur", 
           "surname": "goldberg", 
           "phone": "2200567811",
           "address": "pretoria noth",
           "role": "user", 
           "email": "athur@gmail.com", 
           "password": "athur123" 
         }'

curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{
           "email": "mike@gmail.com",
           "password": "mike123"
         }'

curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{
           "email": "athur@gmail.com",
           "password": "athur123"
         }'


         curl -X PUT http://localhost:3000/api/user/67ac5cecf7a5dd7ec45a50f3 \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWM1Y2VjZjdhNWRkN2VjNDVhNTBmMyIsIm5hbWUiOiJhdGh1ciIsImlhdCI6MTczOTM1MTIwNCwiZXhwIjoxNzM5MzY5MjA0fQ.LHA9oato3BNbgW1zXqX7_jOfgbtjPqPeo4lao7FjA7M" \
     -d '{
           "name": "athur",
           "surname": "goldbergaz",
           "phone": "2200567811",
           "address": "pretoria north",
           "role": "user",
           "email": "athur@gmail.com",
           "password": "athur123"
         }' -v

curl -X DELETE http://localhost:3000/api/user/67ac5cecf7a5dd7ec45a50f3 \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWM1Y2VjZjdhNWRkN2VjNDVhNTBmMyIsIm5hbWUiOiJhdGh1ciIsImlhdCI6MTczOTM1MTIwNCwiZXhwIjoxNzM5MzY5MjA0fQ.LHA9oato3BNbgW1zXqX7_jOfgbtjPqPeo4lao7FjA7M" \
     -v
