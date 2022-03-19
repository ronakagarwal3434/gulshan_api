const express = require("express");
const axios = require("axios");

const app = express();

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

app.get("/todos", async (req, res) => {
    try {
        let response = await axios.get("/todos");
        let data = response.data;
        const result = data.map(({ userId, ...rest }) => ({
            ...rest,
        }));
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).send("Try Again");
    }
});

app.get("/user/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    try {
        let userResponse = await axios.get(`/users/${userId}`);
        let userData = userResponse.data;
        let todosResponse = await axios.get("/todos");
        let todosData = todosResponse.data;
        let todosResult = todosData.filter((obj) => {
            return obj.userId == userId;
        });
        const result = { userData, todos: todosResult };
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).send("Try Again");
    }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
