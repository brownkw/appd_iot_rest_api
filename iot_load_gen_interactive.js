const { prompt } = require("inquirer");
const { spawn } = require("child_process");
const util = require("util");

var isNullOrWhitepsace = function(input) {
    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}

// Prompt questions
const questions = [
    {
        type: 'input',
        name: 'app_key',
        message: 'App key: ',
        validate: function(val) {
            if (!isNullOrWhitepsace(val)) {
                return true;
            } else {
                return 'Please enter an app key.';
            }
        }
    },
    {
        type: 'input',
        name: 'collector_url',
        message: 'Collector URL: ',
        default: 'https://iot-col.eum-appdynamics.com'
    },
    {
        type: 'input',
        name: 'verbose',
        message: 'Verbose output? ',
        default: false
    },
    {
        type: 'input',
        name: 'num_executions',
        message: 'Executions per process: ',
        default: 10,
        validate: function(val) {
            if (isNaN(val)) {
                return 'Please enter a number.';
            }
            if (val <= 0) {
                return 'Please enter a number greater than zero.';
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'num_processes',
        message: 'Number of processes: ',
        default: 1,
        validate: function(val) {
            if (isNaN(val)) {
                return 'Please enter a number.';
            }
            if (val <= 0) {
                return 'Please enter a number greater than zero.';
            }

            return true;
        }
    },   
    {
        type: 'input',
        name: 'min_wait',
        message: 'Minimum wait between executions (ms): ',
        default: 1500,
        validate: function(val) {
            if (isNaN(val)) {
                return 'Please enter a number.';
            }
            if (val <= 0) {
                return 'Please enter a number greater than zero.';
            }

            return true;
        }
    },  
    {
        type: 'input',
        name: 'max_wait',
        message: 'Maximum wait between executions (ms): ',
        default: 3500,
        validate: function(val) {
            if (isNaN(val)) {
                return 'Please enter a number.';
            }
            if (val <= 0) {
                return 'Please enter a number greater than zero.';
            }

            return true;
        }
    },    
];

prompt(questions).then(function(answers) {
    //console.log(answers);
    
    var processes = [];
    for (var i = 0; i < answers.num_processes; i++)
    {
        var cmd_args_str = util.format("iot_load_gen.js -a %s -c %s -n %d -m %d -M %d", answers.app_key, answers.collector_url, answers.num_executions, answers.min_wait, answers.max_wait);
        if (answers.verbose) {
            cmd_args_str += " -v";
        }

        //console.log(cmd_args_str);

        var cmd_args = cmd_args_str.split(' ');

        //console.log(cmd);
        var child = spawn("node", cmd_args);   
        display_with_id(child);

        //processes.push(child);
    }

});

var display_with_id = function(proc) {
    proc.stdout.on('data', (data) => {
        process.stdout.write(`child ${proc.pid} stdout: ${data}`);
    });

    proc.stderr.on('data', (data) => {
        process.stderr.write(`child ${proc.pid} stderr: ${data}`);
    });
};