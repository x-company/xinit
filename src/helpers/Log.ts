/**
 * Copyright (c) 2019 IT Solutions Roland Breitschaft <info@x-company.de>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 *
 * @Script: Log.ts
 * @Author: Roland Breitschaft
 * @Email: roland.breitschaft@x-company.de
 * @Create At: 2019-03-26 14:38:04
 * @Last Modified By: Roland Breitschaft
 * @Last Modified At: 2019-06-11 16:49:52
 * @Description: This is description.
 */


import winston, { Logger, format } from 'winston';
import { Info } from '../helpers/Info';
import { CliManager } from './CliManager';

export class Log {

    public static silly(message: any) {
        this.Logger.log('silly', message);
    }

    public static debug(message: any) {
        this.Logger.log('debug', message);
    }

    public static verbose(message: any) {
        this.Logger.log('verbose', message);
    }

    public static info(message: any) {
        this.Logger.log('info', message);
    }

    public static warn(message: any) {
        this.Logger.log('warn', message);
    }

    public static error(message: any) {
        this.Logger.log('error', message);
    }

    private static logger: Logger;

    private static get Logger(): Logger {

        if (!this.logger) {
            const { combine, timestamp, label, printf } = format;

            // tslint:disable-next-line: no-shadowed-variable
            const customFormat = printf(({ level, message, label, timestamp }) => {
                return `${timestamp} [${label}] ${level}: ${message}`;
            });

            this.logger = winston.createLogger(
                {
                    exitOnError: true,
                    format: combine(
                        label({ label: Info.ProductName }),
                        timestamp(),
                        customFormat,
                    ),
                    transports: [
                        new winston.transports.Console(),
                        // new Syslog({
                        //     host: 'localhost',
                        // }),
                    ],
                },
            );
        }

        this.logger.level = CliManager.get<string>('level') || 'warn';
        return this.logger;
    }
}
