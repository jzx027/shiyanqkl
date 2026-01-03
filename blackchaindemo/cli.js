const { Command } = require('vorpal');
const P2p = require('./P2p.js');
const Blockchain = require('./blockchain.js');
const blockchain = new Blockchain();
const p2p = new P2p(blockchain);

//初始化
function cli(vorpal) {
  vorpal.use(welcome).use(connectCommand).use(discoverCommand).use(blockchainCommand).use(peersCommand).use(mineCommand).use(openCommand).delimiter('blockchain>>>>>>>').show();
}

module.exports = cli;

function welcome(vorpal) {
  vorpal.log('Welcome to blockchain cli');
  vorpal.exec('help');

}

function connectCommand(vorpal) {
  vorpal.command('connect <host> <port>', 'Connect to a peer.eg:connect localhost 2727')
    .alias('c')
    .action(function (args, callback) {
      if (args.host && args.port) {
        try {
          p2p.connectToPeer(args.host, args.port);
        } catch (err) {
          this.log(err.message);
        }
      }
      callback();
    })
}

function discoverCommand(vorpal) {
  vorpal.command('discover', 'Discover new peers from connected peers.')
    .alias('d')
    .action(function (args, callback) {
      try {
        p2p.discoverPeers();
      } catch (err) {
        this.log(err.message);
      }
      callback();
    })
}

function blockchainCommand(vorpal) {
  vorpal.command('blockchain', 'see the current state of the blockchain.')
    .alias('bc')
    .action(function (args, callback) {
      this.log(blockchain);
      callback();
    })
}


function peersCommand(vorpal) {
  vorpal.command('peers', 'get the list of connected peers.')
    .alias('p').action(function (args, callback) {
      p2p.peers.forEach(element => {
        this.log(`${peer.remoteAddress}\n`);
      }, this);

      callback();
    })

}

//挖矿指令
function mineCommand(vorpal){
  vorpal.command('mine <data>','Mine a new block,eg "hello world"')
  .alias('m')
  .action(function(args,callback){
    if(args.data){
      blockchain.mine(args.data);
      p2p.broadcastLatestBlock();

    }
    callback();
  })
}

//开启端口指令
function openCommand(vorpal) {
  vorpal.command('open <port>', 'Open a P2P port to accept incoming connections.eg:open 2727')
    .alias('o')
    .action(function (args, callback) {
      if (args.port) {
        if (typeof args.port === 'number'){
          p2p.startServer(args.port);

          this.log(`Listening on port ${args.port}`);
        }else{
          this.log('Invalid port number');
        }
      }
      callback();
    })
}

