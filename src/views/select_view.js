const PubSub = require('../helpers/pub_sub.js')

const SelectView = function(selector) {
  this.selector = selector;
}

SelectView.prototype.bindEvent = function () {
  PubSub.subscribe('Munros:data-ready', (event) => {
    const munros = event.detail;
    const regions = this.getRegions(munros);
    this.populate(regions);

    this.selector.addEventListener('change', (event) => {
      event.preventDefault();
      const region = event.target.value;
      PubSub.publish('SelectView:region-chosen', regions[region]);
    })

  });

}

SelectView.prototype.getRegions = function(munros){
  const regions = munros.map( (munro) => {
    return munro.region;
  })


  const uniqueRegions = [...new Set(regions)];

  return uniqueRegions;
}

SelectView.prototype.populate = function(uniqueRegions) {


  uniqueRegions.forEach((region, index) => {
    const option = document.createElement('option');
    option.textContent = region;
    option.value = index;
    this.selector.appendChild(option);
  })
}

module.exports = SelectView
