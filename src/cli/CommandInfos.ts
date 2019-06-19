/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: CommandInfos.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 15:18:44
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-19 08:20:05
 * @Description: This is description.
 */

export class CommandInfos {

    public static main = {
        command: 'xinit', description: 'Helper to create and Start runit Services for a Docker Image.',
    };

    public static service = {
        command: 'service', description: 'Helps you to manage runit Services',
    };

    public static event = {
        command: 'event', description: 'Helps you to manage Events for ',
    };

    public static layout = {
        command: 'layout', description: 'Creates the Working Layout to create new Services',
    };
}
