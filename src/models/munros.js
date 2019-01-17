const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js')

const Munros = function(){
  this.data = null;
}

Munros.prototype.bindEvent = function () {
  this.getData();
}

Munros.prototype.getData = function (region){
  const url = 'https://munroapi.herokuapp.com/munros';
  const request = new RequestHelper(url);
  request.get()
  .then((data) => {
    this.data = data;
    PubSub.publish('Munros:data-ready', this.data);
  })
  .catch( (message) => {
    console.error(message);
  });

}

module.exports = Munros;
