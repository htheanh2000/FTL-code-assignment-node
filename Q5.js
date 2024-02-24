const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
app.use(express.json());

const userList = [
  {
    name: 'Peter',
    age: 10,
  },
];

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'APIs to manipulate the user list',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['Q5.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get the list of users
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       age:
 *                         type: integer
 *       404:
 *         description: No users found
 */

// Get User List
app.get('/users', (req, res) => {
  if (userList.length > 0) {
    res.json({
      success: true,
      message: "Get user list success",
      data: userList
    });
  } else {
    res.json({
      success: false,
      message: "No user exist"
    });
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User added successfully
 */

// Add User
app.post('/user', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.json({
      success: false,
      message: "Missing required field - name or age"
    });
  }

  userList.push({ name, age });
  res.json({
    success: true,
    message: `User ${name} has been added`,
    data: {}
  });
});

/**
 * @swagger
 * /user/{index}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *     - in: path
 *       name: index
 *       schema:
 *         type: integer
 *       required: true
 *       description: Index of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 */

// Update User
app.put('/user/:index', (req, res) => {
  const { index } = req.params;
  const { name, age } = req.body;

  if (index >= userList.length || index < 0) {
    return res.json({
      success: false,
      message: "No such user exist"
    });
  }

  if (name) userList[index].name = name;
  if (age) userList[index].age = age;

  res.json({
    success: true,
    message: "User has been updated",
    data: []
  });
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

// Delete User
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  if (id >= userList.length || id < 0) {
    return res.json({
      success: false,
      message: "No such user exist"
    });
  }

  userList.splice(id, 1);
  res.json({
    success: true,
    message: "User has been deleted",
    data: []
  });
});

app.listen(3000, () => {
  console.log(`[Info] API Service listening to Port 3000`);
});

module.exports = app;
