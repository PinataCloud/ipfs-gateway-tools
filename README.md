# IPFS Gateway Tools

IPFS Gateway Tools

## Overview

This toolkit contains helper functions for working with IPFS gateway URLs and transforming them as desired.

This package comes with a distributions for the browser and for NodeJS. Take care to ensure you are importing or requiring in the right version. 

## Installation
```
npm install --save @pinata/ipfs-gateway-tools
```

## Browser Setup
To require this in your project simply include the library at the top of your file like so:

```javascript
import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/browser';
const gatewayTools = new IPFSGatewayTools();
```

## NodeJS Setup

```javascript
const IPFSGatewayTools = require('@pinata/ipfs-gateway-tools/dist/node');
const gatewayTools = new IPFSGatewayTools();
```

## Usage
The IPFS gateway toolkit currently contains the following functions:

* [containsCID](#containsCID-anchor)
* [convertToDesiredGateway](#convertToDesiredGateway-anchor)


<a name="containsCID-anchor"></a>
### containsCID


##### `ipfsGatewayTools.containsCID(url)`
##### Params
* `url` - A gateway url that should take one of the following forms:
   * `ipfs://CID`
   * `ipfs://ipfs/CID`
   * `https://example-gateway.com/ipfs/CID`
   * `https://example-gateway.com/ipfs/CID/exampleFile.json`
   * `https://example-gateway.com/ipns/CID`
    
#### Response
```
{
    containsCid: (Boolean) - True if the url contains a CID,
    cid: (string) - The CID that the url contains if "containsCid" is true
}
```

<a name="convertToDesiredGateway-anchor"></a>
### convertToDesiredGateway


##### `ipfsGatewayTools.convertToDesiredGateway(sourceUrl, desiredGatewayPrefix)`
##### Params
* `sourceUrl` - A gateway url that should take one of the following forms:
   * `ipfs://CID`
   * `ipfs://ipfs/CID`
   * `https://example-gateway.com/ipfs/CID`
   * `https://example-gateway.com/ipfs/CID/exampleFile.json`
   * `https://example-gateway.com/ipns/CID`
* `desiredGatewayPrefix` - The desired gateway you want to convert your source URL to. A few examples of this would be:
   * `https://mygateway.mypinata.cloud`
   * `https://ipfs.io`
    
#### Response
Returns a string that uses the desired source gateway prefix. 

Example code:
```javascript
const sourceUrl = 'https://exampleGateway.com/ipfs/bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m';
const desiredGatewayPrefix = 'https://mygateway.mypinata.cloud'
const convertedGatewayUrl = ipfsGatewayTools.convertToDesiredGateway(sourceUrl, desiredGatewayPrefix);

//In the example above, the resulting value for convertedGatewayUrl would be: https://mygateway.mypinata.cloud/ipfs/bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m
```

## Questions? Issues? Suggestions? 
Feel free to file a github issue or email us at team@pinata.cloud 

We'd love to hear from you!
