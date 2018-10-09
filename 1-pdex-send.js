module.exports = function(RED) {

	function jsonparse(jstr) {
		try {
			var out = JSON.parse(jstr);
			return out;
		}
		catch(e) {
			return "";
		}
	}

    function PdexRESTPublishNode(config) {
    	var rest = require('restler');

    	var hmacUri = '/api/v1/utils/hmac';
    	var deviceMsgSendUri = '/api/v1/devices/';

        RED.nodes.createNode(this, config);
        var node = this;

	    node.on('input', function(msg) {
	    	var pdexurl = config.pdexurl;
	    	var accesskey = config.accesskey;
	    	var deviceid = config.deviceid;
	    	var secretkey = config.secretkey;
	    	var appid = config.appid;
	    	var apptoken = config.apptoken;

	    	//var payloadObject = config.payloadType=='str'?config.payload:(msg[config.payload]||'');
	    	var payloadObject = msg[config.payload];

			rest.post(pdexurl + hmacUri , {
				data: { key: secretkey, message: deviceid, eq_stripped: true },
			}).on('complete', function(data, response) {
				if (response.statusCode == 200) {
					var payload = { payloadObject };
					rest.post( pdexurl + deviceMsgSendUri + '/' + deviceid + '/message', {
						headers: {
							'Authorization': 'Bearer ' + data.digest,
							'Content-Type': 'application/json'
					 },
						data: JSON.stringify(payload),
					}).on('complete', function(data, response) {
						if (response.statusCode == 201) {
							var msg = {
								payload : jsonparse(payload),
								transaction : jsonparse(data)
							};
							node.send(msg);
						}
					});
			 	}
			});
        });

    }
    RED.nodes.registerType("send message",PdexRESTPublishNode);
}