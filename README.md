# xbuild-mgr - A CLI for xbuild to create small and securey Docker Images written in Node

[![xbuild-mgr-version](https://img.shields.io/badge/Version-0.5.2-brightgreen.svg?style=flat)](https://www.npmjs.com/package/xbuild-mgr/v/0.5.2)
[![xbuild-mgr-status](https://img.shields.io/badge/Status-development%201-brightgreen.svg?style=flat)](https://github.com/x-company/xbuild-mgr#status)
[![xbuild-mgr-build](https://img.shields.io/badge/Builds-17-brightgreen.svg?style=flat)](https://github.com/x-company/xbuild-mgr#status)
[![Build Status](https://travis-ci.org/x-company/xbuild-mgr.svg?branch=master)](https://travis-ci.org/x-company/xbuild-mgr)

`xbuild-mgr` is a Tool which will help you to develop small and secure Docker Base Images. It helps you to create your own secure Base Image derived from xbuild (see <https://github.com/x-company/xbuild).> *xbuild* is a Framework to helps you to let run your app in his own sandbox and as different User as root. To reach this goal *xbuild* uses the Supervisor *s6*. This Supervisor loads all your Commands with the *Chain loading* Method. `xbuild-mgr` helps you to create a correct Project Layout to develop your on Docker Images in front of *xbuild*.

## System Requirements

### Recommended Software Packages

- NodeJs
- Visual Studio Code (recommended)
- git
- yarn (`npm install -g yarn`)

## Quickstart

1. First you have to Install `xbuild-mgr` with `npm install -g npm-mgr`
2. Create a Folder on a Location of your Choice and open your favorit bash.
3. Now execute the command `xbuild layout create --name mydockerimages/firstimage --with-project-layout`

*xbuild-mgr* creates now new Project Layout to develop your Base Image

## HowTo add a new App/Service

1. Change to your Project Directory and execute the command `xbuild service create --name myservice`
2. *xbuild-mgr* has now created a new Folder under `./src/yourimagename/build/services`
3. Now fill out the file `myservice.build` and the File `myservice.run`. `myservice.build` is the Install File to install and build your App/Service. Typically install here your Package. `myservice.run` will call when the Supervisor starts your Service.

## Sample for a Service Build File (here we install consul)

```bash
#!/usr/bin/execlineb -P

# Loads the Environment Variables
s6-envdir /etc/xbuild/env.d/

# Writes an Log Entry
if { xb-log "Create Service Folders" }

# Create needed Directories
if { s6-mkdir -p /var/lib/consul }
if { s6-mkdir -p /etc/consul.d/ }

# Add an new User and Group for this Service
if { xb-addserviceuser -u consul -i 890 }
```

Thats it.

## Sample for a Service Run file (here we start consul)

```bash
#!/usr/bin/execlineb -P

# Load Environment Vars
s6-envdir /etc/xbuild/env.d/
importas -u dev_enabled DEV_ENABLED

# All following Commands will executed as User consul
s6-setuidgid consul
ifelse { s6-test "${dev_enabled}" = "Y" }
{
    # Is Development Mode requested we start consul in Dev Mode
    /usr/local/bin/consul agent -data-dir=/var/lib/consul/ -config-dir=/etc/consul.d/ -pid-file=/tmp/consul.pid -enable-local-script-checks -dev
}

# Start Consul in Normal Mode
/usr/local/bin/consul agent -data-dir=/var/lib/consul/ -config-dir=/etc/consul.d/ -pid-file=/tmp/consul.pid -enable-local-script-checks

```

Finally modify the `Dockerfile.tmpl` in your *build* Folder and create a new Dockerfile Template. If you use Visual Studio Code as your Development Environment, you can use the Snippet *xb-docker*.

## HowTo build my Image

Simply call the Command `yarn build`. Thats it! After a while your new Docker Image is created, cleaned and hardened.

## Overview of existing *yarn* Commands

- **yarn clean** Cleans all your Builds and Docker Images
- **yarn build** Build the Image
- **yarn test** Executes Unit Tests
- **yarn ci** Is needed for Continues Integration on your Build Server, like travis or so.
- **yarn release** Creates a new Release of your Image an publishes the Code
- **yarn debug** Executes your Code local as a Docker Image

## Further Details

The created Project Layout is fully integrated in Visual Studio Code. That means, if you use Visual Studio Code, you have a great Benefit and Advantages of the Tools, Snippets and Settings, which already and out of the Box are integrated in the Project Layout.

One Feature is, you can use *RemoteContainers*, which will allow you to develop and test your Image in an Docker Container. To do so, press *F1* and type *RemoteContainers: Open Folder in Container*. After a while your Project is started in a Docker Container based on your Project Layout.

A another Feature are Code Snippets. In your Project Layout you have a bundle of Snippets integrated. This are ...

- **xb-docker** to create a Docker File in your Project Layout. Meanly used to create your *Dockerfile.tmpl* File
- **xb-docker-no-layout** to create a Docker file without an Project Layout. This UseCase will applicable if you want to build an Service without an Project Layout
- **xb-docker-health** create an Health Entry in your Dockerfile

## How to configure and manage the build

You can manage the behaviour of *xbuild* in a Config File called *xbuild.conf*. This File can be found on two locations in your Project Layout. One Location is the Folder *.devcontainer* and the another Location is the Build folder in the Home of your Service. Why is this so?

Its reallys simple to understand. All Configurations you made in Folder *.devcontainer* is only for your local Development. The other File is for Deployment.

## HowTo configure the Mirrors for install of further Packages

The same behaviour is for a custom *sources.list*. Per default *xbuild* configures your Image with the official Repositories, that can be found in the Internet. If you dont have access to the Internet you have to define your own *sources.list* with your custom Mirrors.

If you want more Informations of *xbuild* please visit <https://github.com/x-company/xbuild>
