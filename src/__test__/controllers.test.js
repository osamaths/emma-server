const request = require("supertest");
const app = require("../../src/app");
const mongoDB = require("../configs/mongoDB");
const { MongoClient } = require("mongodb");

const MOCK_QUESTION = { question: "Is this a free test question?", type: "free" };

describe("Test /questions endpoints", () => {
    it("Should insert a question with POST:/api/v1/questions", () => {
        return request(app)
            .post("/api/v1/questions")
            .send(MOCK_QUESTION)
            .expect(200)
            .then((response) => {
                expect(response._body?.question).toEqual(MOCK_QUESTION.question);
            });
    });

    it("Should get the questions with GET:/api/v1/questions", () => {
        return request(app)
            .get("/api/v1/questions")
            .expect(200)
            .then((response) => {
                expect(response._body?.length).toBeGreaterThan(0);
            });
    });
});

describe("Test /answers endpoints", () => {
    it("Should insert an answer with POST:/api/v1/answers", () => {
        return request(app)
            .get("/api/v1/questions")
            .expect(200)
            .then((response) => {
                const questions = response._body || [];
                const answers = {};

                questions.forEach((q) => {
                    answers[q._id] = q.type === "free" ? "Test answer" : (q.options || [])[0];
                });

                return request(app)
                    .post("/api/v1/answers")
                    .send({ answers })
                    .expect(200)
                    .then((response) => {
                        expect(response._body?.answers?.length).toEqual(questions.length);
                    });
            });
    });

    it("Should get the answers with GET:/api/v1/answers", () => {
        return request(app)
            .get("/api/v1/answers")
            .expect(200)
            .then((response) => {
                const answers = response._body || [];
                expect(answers.length).toBeGreaterThan(0);
            });
    });
});

describe("MongoDB", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoDB.uri, {
            useNewUrlParser: true,
        });
        db = await connection.db(mongoDB.name);
    });

    afterAll(async () => {
        await db.collection("questions").drop();
        await db.collection("answers").drop();
        await connection.close();
        await mongoDB.mongoose.connection.close();
    });

    it("should get inserted question", async () => {
        const questions = db.collection("questions");

        const insertedQuestion = await questions.findOne({ question: MOCK_QUESTION.question });

        expect(insertedQuestion.question).toEqual(MOCK_QUESTION.question);
    });
});
