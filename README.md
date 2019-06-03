# XINIT - A Docker Init Helper

[![xinit-version](https://img.shields.io/badge/Version-0.1.0-brightgreen.svg?style=flat)](https://www.npmjs.com/package/xinit/v/0.1.0)
[![xinit-status](https://img.shields.io/badge/Status-alpha%200-brightgreen.svg?style=flat)](https://github.com/x-company/xinit#status)
[![xinit-build](https://img.shields.io/badge/Builds-31-brightgreen.svg?style=flat)](https://github.com/x-company/xinit#status)

`xinit` is a special Init System for Docker Images. Each Service which runs in Docker has one or more Helper Services to work right. The main Problem is, when Docker starts, only one Service with PID 0 is running. Other Services like syslog, cron a.s.o. will not started by the Main Docker Run Command. This is not really secure and good practice in Linux Environments.

So now look what `xinit` can do for you. `xinit` will helps you to create your Helper Services right, and the Main Service will not run under PID 0.
