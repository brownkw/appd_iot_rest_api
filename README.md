# appd_iot_rest_api
NodeJS sample implementation of the AppDynamics IoT REST APIs. [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## How It Works
This NodeJS application simulates sending IoT beacon data to the AppDynamics IoT REST API. The important files are listed below:

- iot_load_gen_interactive.js -- used for an interactive step-by-step prompting for generating the load
- iot_load_gen.js -- the main program to call (see below)
- iot_load_gen_logic.js -- the file that contains the core logic for sending beacon data to the REST API
- devices/device01.js -- the file that is used to construct the beacons being sent

## Installation

```sh

$ cd <install_directory>
$ npm install

```

## Help Options

```sh

$ cd <install_directory>
$ node iot_load_gen.js --help

Usage: iot_load_gen [options]
  
AppD IoT Load Generator written in NodeJS
  
Options:
  
-V, --version output the version number
-a, --app_key <app_key> (REQUIRED) The AppD IoT App Key
-c, --collector_url <url> Sets the collector URL (default: https://iot-col.eum-appdynamics.com)
-v, --verbose Verbose logging
-n, --num_executions <num_execs>  The number of times to execute (default: 10)
-m, --min_delay <delay> Minimum delay time in milliseconds (default: 1500)
-M, --max_delay <delay> Maximum delay time in milliseconds (default: 4500)
-h, --help  output usage information

```  

## Default Usage

```sh

$ cd <install_directory>
$ node iot_load_gen.js -a <app_key>

```

## Interactive Prompts

```sh

$ cd <install_directory>
$ node iot_load_gen_interactive.js

```