const PubSub = require('../helpers/pub_sub.js')
const IndividualMunroView = require('./individual_munro_view.js')

const MunrosView = function(element) {
  this.element = element;
}

MunrosView.prototype.bindEvent = function(){
  PubSub.subscribe('Munros:data-ready', (event) => {
    const munros = event.detail;
    PubSub.subscribe('SelectView:region-chosen', (event) => {
      const region = event.detail
      const filtered = munros.filter((munro) => {
        return munro.region === region;
      })

      this.render(filtered);
    })
  })
}

MunrosView.prototype.render = function(munros) {
  this.clearMunros();

  munros.forEach( (munro) => {

    const individualMunroView = new IndividualMunroView(this.element, munro)
    individualMunroView.render()

  })
}

MunrosView.prototype.clearMunros = function() {
  this.element.innerHTML = '';
}

module.exports = MunrosView;
