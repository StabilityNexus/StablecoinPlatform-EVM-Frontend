export const StableCoinFactoryABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reactor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "base",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "vaultName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "neutronName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "neutronSymbol",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "protonName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "protonSymbol",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fissionFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fusionFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "targetReserveRatioWAD",
        "type": "uint256"
      }
    ],
    "name": "ReactorDeployed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reactor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "base",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "basePriceId",
        "type": "bytes32"
      }
    ],
    "name": "ReactorDeployedWithOracle",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deployedReactors",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_vaultName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_base",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_pyth",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_basePriceId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_neutronName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_neutronSymbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_protonName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_protonSymbol",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_fissionFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_fusionFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_targetReserveRatioWAD",
        "type": "uint256"
      }
    ],
    "name": "deployReactor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllDeployedReactors",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDeployedReactorsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_base",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "reactorsByBase",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const
