// var express = require('express');
// var app = express();
// var CreateCommand = require('../../../lib/commands/service/CreateCommand').CreateCommand;

import express from 'express';
import { CreateCommand } from '../../../src/commands/layout/CreateCommand';

const app = express();
app.listen(3000, () => { console.log('Server is running on Port 3000'); });

app.get('/create', async (request, response, next) => {

    try {
        const cmd = new CreateCommand({
            directory: '/testarea',
            baseImageName: '',
            imageName: '',
        });
        await cmd.invoke();


    } catch (err) {
        response.sendStatus(500);
        response.redirect(err);
    }
});
