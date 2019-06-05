/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: index.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-06-03 09:32:11
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-03 09:32:11
 * @Description: This is description.
 */

import express from 'express';
import { CreateCommand } from '../../src/commands/layout/CreateCommand';

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
