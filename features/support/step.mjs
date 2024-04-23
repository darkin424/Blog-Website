import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import axios from 'axios';

let createdRecipeId;

Given('I have a valid token', async function () {
  this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhYmNAYWJjLmNvbSIsImlhdCI6MTcxMzM1ODYyNCwiZXhwIjoxNzEzNDQ1MDI0fQ.L6cuV3bPtBzyKerVqYzhePsREKzuXOzvNHNV0F1t3_4';
});

When('I create a new recipe with title {string} and body {string}', async function (title, body) {
  try {
    const response = await axios.post('http://localhost:4040/create-post', {
      title: title,
      body: body,
    }, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    expect(response.status).to.equal(200);
    createdRecipeId = response.data.recipe.id;
  } catch (error) {
    this.error = error.response.data.error;
  }
});

Then('I should receive a successful response with the created recipe', function () {
  expect(this.error).to.be.undefined;
  expect(createdRecipeId).to.not.be.undefined;
});


// 2nd Scenario
Given('I have an invalid token', function () {
  this.token = 'mock-invalid-token';
});

When('I attempt to create a new recipe with title {string} and body {string}', async function (title, body) {
  try {
    const response = await axios.post('http://localhost:4040/create-post', {
      title: title,
      body: body,
    }, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    this.responseStatus = response.status;
  } catch (error) {
    this.error = error.response.data.error;
    this.responseStatus = error.response.status;
  }
});

Then('I should receive an ok response with status code {int}', function (statusCode) {
  expect(this.ok).to.be.undefined;
  expect(this.responseStatus).to.equal(statusCode);
});