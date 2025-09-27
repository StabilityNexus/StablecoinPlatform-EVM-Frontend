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
        "indexed": true,
        "internalType": "address",
        "name": "pyth",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "priceId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "criticalRatio",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxPriceAge",
        "type": "uint256"
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
        "name": "_priceId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_maxPriceAge",
        "type": "uint256"
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
    "inputs": [
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
        "name": "_priceId",
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
      }
    ],
    "name": "deployReactorQuick",
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
    "inputs": [
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
        "name": "_priceId",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "riskLevel",
        "type": "uint8"
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
      }
    ],
    "name": "deployReactorWithRiskLevel",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "reactorAddress",
        "type": "address"
      }
    ],
    "name": "getReactorInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "vaultName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "base",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "neutron",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "proton",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "reserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "neutronSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "protonSupply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveRatio",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isHealthy",
        "type": "bool"
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
      }
    ],
    "name": "getReactorCountByBase",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_base",
        "type": "address"
      }
    ],
    "name": "getReactorsByBase",
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
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
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
] as const;
