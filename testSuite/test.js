let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('../app');
let server = require('../app')

//assertion style
chai.should();

chai.use(chaiHttp);

describe('user APIs', () => {
   
    describe("POST /v1/crudManagement/users/createUser", () => {
        it.skip("It should create user", (done) => {
            chai.request(server)
                .post('/v1/crudManagement/users/createUser')
                .send({
                    userName : 'test12345',
                    password : '12345'
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
    })

    describe("POST /v1/crudManagement/users/login", () => {
        it("It should login user", (done) => {
            chai.request(server)
                .post('/v1/crudManagement/users/login')
                .send({
                    userName : 'test12345',
                    password : '12345'
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('type').eq('success');
                done();
                })
        })
    })
})


describe('crud APIs', () => {
   
    describe("POST /v1/crudManagement/items/createItem", () => {
        it("It should create item", (done) => {
            chai.request(server)
                .post('/v1/crudManagement/items/createItem')
                .send({
                    itemName : 'item1',
                    price : 100
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('type').eq('success');
                done();
                })
        })
    })

    describe("GET /v1/crudManagement/items/:itemId/getItem", () => {
        it.skip("It should get item", (done) => {
            chai.request(server)
                .get(`/v1/crudManagement/items/${3}/getItem`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('type').eq('success');
                done();
                })
        })
    })

    describe("PATCH /v1/crudManagement/items/:itemId/updateItem", () => {
        it.skip("It should update item", (done) => {
            chai.request(server)
                .patch(`/v1/crudManagement/items/${3}/updateItem`)
                .send({
                    itemName : 'item1',
                    price : 100
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('type').eq('success');
                done();
                })
        })
    })

    describe("DELETE /v1/crudManagement/items/:itemId/deleteItem", () => {
        it.skip("It should delete item", (done) => {
            chai.request(server)
                .delete(`/v1/crudManagement/items/${3}/deleteItem`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('type').eq('success');
                done();
                })
        })
    })
})