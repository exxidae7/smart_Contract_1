const assert = require('assert')
const ganache = require('ganache')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { interface , bytecode } = require('../compile')



let accounts
let inbox

beforeEach(async () => {
     // get list of all account
     accounts = await web3.eth.getAccounts()
     
     // use one of those account to deploy
     // contracts
     inbox = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data : bytecode , arguments: ['Hi there'] })
     .send({ from : accounts[0] , gas : '1000000'})

})

describe('Inbox' , () => {
     it('deploys a contract' , () => {
          assert.ok(inbox.options.address)
     })
     it('has a default messsage' , async () => {
          const message = await   inbox.methods.message().call()
          assert.equal(message , 'Hi there')
     })
     it('can change the message' , async () =>{
          await inbox.methods.setMessage('bye').send({
               from : accounts[0]
          })
          const message = await   inbox.methods.message().call()
          assert.equal(message , 'bye')
     })
})