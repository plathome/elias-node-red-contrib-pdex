# node-red-contrib-pdex


### Installation

1. Clone the repository
```
git clone https://github.com/plathome/elias-node-red-contrib-pdex.git
```

2. cd to node-red home directory

3. npm install the library 
```
npm install /to/the/directory/elias-node-red-contrib-pdex 
```

4. Restart Node-Red Service

5. Example Flow

### Node-Red Importable Format

```
[{"id":"f784bfcb.3124d8","type":"send message","z":"1ab9cd.b9701e33","name":"send message","pdexurl":"http://localhost:8090","accesskey":"72388e46b77f","deviceid":"01.a71aff.00000012","secretkey":"fc5f7822d68a","appid":"1b1cbb1d26a846f2a346a13e02579732","apptoken":"30b381c8cee7","payload":"{a:1,b:2}","payloadType":"str","x":260,"y":320,"wires":[],"inputLabels":["ssss"]},{"id":"3699ac3f.9c7e54","type":"inject","z":"1ab9cd.b9701e33","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":140,"wires":[["dc5bf157.2a89a8","f784bfcb.3124d8"]]},{"id":"dc5bf157.2a89a8","type":"debug","z":"1ab9cd.b9701e33","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":460,"y":180,"wires":[]}]
```

### Flow in Readable Format

```
[
  {
    "id": "f784bfcb.3124d8",
    "type": "send message",
    "z": "1ab9cd.b9701e33",
    "name": "send message",
    "pdexurl": "http://localhost:8090",
    "accesskey": "72388e46b77f",
    "deviceid": "01.a71aff.00000012",
    "secretkey": "fc5f7822d68a",
    "appid": "1b1cbb1d26a846f2a346a13e02579732",
    "apptoken": "30b381c8cee7",
    "payload": "{a:1,b:2}",
    "payloadType": "str",
    "x": 260,
    "y": 320,
    "wires": [],
    "inputLabels": [
      "ssss"
    ]
  },
  {
    "id": "3699ac3f.9c7e54",
    "type": "inject",
    "z": "1ab9cd.b9701e33",
    "name": "",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "x": 160,
    "y": 140,
    "wires": [
      [
        "dc5bf157.2a89a8",
        "f784bfcb.3124d8"
      ]
    ]
  },
  {
    "id": "dc5bf157.2a89a8",
    "type": "debug",
    "z": "1ab9cd.b9701e33",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "payload",
    "x": 460,
    "y": 180,
    "wires": []
  }
]
```


6. Figure 1
![](docs/images/fig1.png?raw=true)

7. Figure 2 : Bypassing message payload from input
![](docs/images/fig2.png?raw=true)

8. Figure 3 : Bypassing String as message
![](docs/images/fig3.png?raw=true)
