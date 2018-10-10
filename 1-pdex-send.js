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

	    	var payloadObject = msg.payload;

			rest.post(pdexurl + hmacUri , {
				data: { key: secretkey, message: deviceid, eq_stripped: true },
			}).on('complete', function(err, data, response) {
				if (err) {
					node.error(err);
					node.status({fill:"red", shape:"ring", text:"pdexchange send failed"});
			 	} else {
					if (response.statusCode == 200) {
						var payload = { payloadObject };
						rest.post( pdexurl + deviceMsgSendUri + '/' + deviceid + '/message', {
							headers: {
								'Authorization': 'Bearer ' + data.digest,
								'Content-Type': 'application/json'
						 },
							data: JSON.stringify(payloadObject),
						}).on('complete', function(error, data, response) {
							if (error) {
								node.error(error);
								node.status({fill:"yellow", shape:"ring", text:"pdexchange send failed c"});
							} else {
								if (response.statusCode == 201) {
									var msg = {
										payload : jsonparse(payloadObject),
										transaction : jsonparse(data)
									};
									node.send(msg);
									node.status({});
								}								
							}
						});
				 	}
			 	}
			});
        });

    }
    RED.nodes.registerType("PD Exchange",PdexRESTPublishNode);
}