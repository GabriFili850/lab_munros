const Munros = require('./models/munros.js');
const MunrosView = require('./views/munros_view.js');
const SelectView = require('./views/select_view.js')

document.addEventListener('DOMContentLoaded', () => {

  const selected = document.querySelector('#munros');
  const munrosView = new MunrosView(selected);
  munrosView.bindEvent();

  const munrosRegion = document.querySelector('#munros_region')
  const selectView = new SelectView(munrosRegion)
  selectView.bindEvent();

  const munros = new Munros();
  munros.bindEvent();

});
