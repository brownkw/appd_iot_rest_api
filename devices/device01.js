const moment = require("moment");
const mathjs = require("mathjs");

var devices_votes = [
    {
        "deviceId": 'G030MD042106WXLB',
        "VoteRecipient": "Dali Rajic",
        "VoteBoard" : '1',
        "CountTheVote" : 'false'
    },
    {
        "deviceId": 'G030MD043224FR2H',
        "VoteRecipient": "Dali Rajic",
        "VoteBoard" : '2',
        "CountTheVote" : 'false'
    },
    {
        "deviceId": 'G030MD041166E2CL',
        "VoteRecipient": "Dali Rajic",
        "VoteBoard" : '3',
        "CountTheVote" : 'false'
    },
    {
        "deviceId": 'G030MD044433P97H',
        "VoteRecipient": "David Wadhwani",
        "VoteBoard" : '1',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD040036PKGK',
        "VoteRecipient": "David Wadhwani",
        "VoteBoard" : '2',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD042127LFV1',
        "VoteRecipient": "David Wadhwani",
        "VoteBoard" : '3',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD04845476VX',
        "VoteRecipient": "Tom Levey",
        "VoteBoard" : '1',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD043256SPF5',
        "VoteRecipient": "Tom Levey",
        "VoteBoard" : '2',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0474726LW2',
        "VoteRecipient": "Tom Levey",
        "VoteBoard" : '3',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0484117N3L',
        "VoteRecipient": "Ghazal Asif",
        "VoteBoard" : '1',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD043016BQTE',
        "VoteRecipient": "Ghazal Asif",
        "VoteBoard" : '2',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD04842794N7',
        "VoteRecipient": "Ghazal Asif",
        "VoteBoard" : '3',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD042353BGTW',
        "VoteRecipient": "Tom Schmit",
        "VoteBoard" : '1',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0485056MHP',
        "VoteRecipient": "Tom Schmit",
        "VoteBoard" : '2',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0483455L0N',
        "VoteRecipient": "Tom Schmit",
        "VoteBoard" : '3',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0450230347',
        "VoteRecipient": "Jim Cavanaugh",
        "VoteBoard" : '1',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0462561VGF',
        "VoteRecipient": "Jim Cavanaugh",
        "VoteBoard" : '2',
        "CountTheVote" : 'true'
    },
    {
        "deviceId": 'G030MD0451549RE3',
        "VoteRecipient": "Jim Cavanaugh",
        "VoteBoard" : '3',
        "CountTheVote" : 'true'
    }
    
];

var click_types = [
    {
        'clickType': 'DOUBLECLICK',
        'clickDesc': 'DOUBLE'
    },
    {
        'clickType': 'SINGLECLICK',
        'clickDesc': 'SINGLE'
    },
    {
        'clickType': 'LONGCLICK',
        'clickDesc': 'LONG'
    }
]

var get_dali_beacon_data = function() {
    var device_idx = mathjs.floor(mathjs.random(0, 3));
    var device = devices_votes[device_idx];

    var click_type_idx = mathjs.floor(mathjs.random(0, click_types.length));
    var click_type = click_types[click_type_idx];

    var device_info = {
        'deviceId': device.deviceId,
        'deviceName': 'AWS IoT Button',
        'deviceType': 'AWS IoT'
    };

    var version_info = {
        'hardwareVersion': '1.0',
        'firmwareVersion': '1.0',
        'softwareVersion': '1.0',
        'operatingSystemVersion': '1.0'
    };

    var custom_events = [
        {
            'eventType': click_type.clickType,
            'eventSummary': click_type.clickDesc,
            'timeStamp': moment().valueOf(),
        },
        {
            'eventType': 'Vote Cast',
            'eventSummary': 'Vote Cast',
            'timeStamp': moment().valueOf(),
            'stringProperties': {
                'VoteRecipient': device.VoteRecipient,
                'VoteDatetime': moment().valueOf(),
                'VoteBoard': device.VoteBoard
            },
            'booleanProperties': {
                'CountTheVote' : 'true'
            }
        }
    ];

    var error_events = [

    ];

    var network_events = [

    ];

    return {
        device_info: device_info,
        version_info: version_info,
        custom_events: custom_events,
        network_events: network_events,
        error_events: error_events
    }
}

var get_beacon_data = function () {
    var device_idx = mathjs.floor(mathjs.random(0, devices_votes.length));
    var device = devices_votes[device_idx];

    var click_type_idx = mathjs.floor(mathjs.random(0, click_types.length));
    var click_type = click_types[click_type_idx];

    var device_info = {
        'deviceId': device.deviceId,
        'deviceName': 'AWS IoT Button',
        'deviceType': 'AWS IoT'
    };

    var version_info = {
        'hardwareVersion': '1.0',
        'firmwareVersion': '1.0',
        'softwareVersion': '1.0',
        'operatingSystemVersion': '1.0'
    };

    var custom_events = [
        {
            'eventType': click_type.clickType,
            'eventSummary': click_type.clickDesc,
            'timeStamp': moment().valueOf(),
        },
        {
            'eventType': 'Vote Cast',
            'eventSummary': 'Vote Cast',
            'timeStamp': moment().valueOf(),
            'stringProperties': {
                'VoteRecipient': device.VoteRecipient,
                'VoteDatetime': moment().valueOf(),
                'VoteBoard': device.VoteBoard
            },
            'booleanProperties': {
                'CountTheVote' : device.CountTheVote
            }
        }
    ];

    var error_events = [

    ];

    var network_events = [

    ];

    return {
        device_info: device_info,
        version_info: version_info,
        custom_events: custom_events,
        network_events: network_events,
        error_events: error_events
    }
};

module.exports = {
    init_get_beacon: get_dali_beacon_data,
    get_beacon: get_beacon_data
};