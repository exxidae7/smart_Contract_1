const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
require('dotenv').config()
let PRIVATE_KEY = process.env.PRIVATE_KEY
let RINKEBY_INFURA = process.env.RINKEBY_INFURA


const provider = new HDWalletProvider(
     PRIVATE_KEY,
     RINKEBY_INFURA
)
const web3 = new Web3(provider)


const deploy = async () => {
     const account = await web3.eth.getAccounts()
     console.log('attempting to deploy' , account[0])

     const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({
          data : bytecode , arguments :  ['Hello']          
     })
     .send({gas : '1000000' , from : account[0]})

     console.log('contract deployed to ' , result.options.address)
     provider.engine.stop()
}


deploy()