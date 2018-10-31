var program = require("commander");
var load_gen = require("./iot_load_gen_logic");

program.version("1.0.0").description("NodeJS sample implementation of the AppDynamics IoT REST APIs");
program.option("-a, --app_key <app_key>", "(REQUIRED) The AppD IoT App Key")
program.option("-c, --collector_url <url>", "Sets the collector URL", "https://iot-col.eum-appdynamics.com")
        .option("-v, --verbose", "Verbose logging")
        .option("-i, --init_only", "Only run init logic")
        .option("-p, --primary_only", "Only run primary load logic")
        .option("-n, --num_executions <num_execs>", "The number of times to execute", 10)
        .option("-m, --min_delay <delay>", "Minimum delay time in milliseconds", 1500)
        .option("-M, --max_delay <delay>", "Maximum delay time in milliseconds", 4500)
        .parse(process.argv);

if (!program.app_key) {
    console.log("Error: App Key missing!");
    program.help();
}

if (program.init_only && program.primary_only)
{
    console.log("Error: cannot specify -i and -p flags together!");
    program.help();
}

console.log("App Key: " + program.app_key);
console.log("Collector URL: " + program.collector_url);            
console.log("Verbose Logging: " + ((program.verbose !== undefined) ? program.verbose : false));  
console.log("Init logic only: " + ((program.init_only !== undefined) ? program.init_only : false));  
console.log("Primary logic only: " + ((program.primary_only !== undefined) ? program.primary_only : false));  
console.log("# of executions: " + program.num_executions);
console.log("Minimum Delay: " + program.min_delay);
console.log("Maximum Delay: " + program.max_delay); 
console.log();
console.log("Executing...");
console.log();

var exec_opts = {
    "app_key" : program.app_key,
    "collector_url" : program.collector_url,
    "verbose" : (program.verbose !== undefined) ? program.verbose : false,
    "num_executions" : Number(program.num_executions),
    "min_delay" : Number(program.min_delay),
    "max_delay" : Number(program.max_delay)
};

//console.log(exec_opts);

if (program.primary_only === undefined || !program.primary_only) {
    load_gen.init_send_events(exec_opts);
}
if (program.init_only === undefined || !program.init_only) {
    load_gen.send_events(exec_opts);
}