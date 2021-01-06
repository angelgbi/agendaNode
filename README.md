# Agenda app

This is a project build with **Node.js**. Is a CRUD backend API with **two main routes** explained on the next section.

Uses: 
- Mongo
- Node **fs** feature

## Routes
This API has two versions:
- V1 `/api/v1/agenda'` which uses a model which work with node **fs** feature to write the changes to the .json file directly.
- V1 `/api/v2/agenda'` which uses **mongoose** to retrieve contact information.
