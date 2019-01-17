const IndividualMunroView = function(element, munro){

  this.element = element;
  this.munro = munro;

}

IndividualMunroView.prototype.render = function(){

    const div = document.createElement('div');
    div.textContent = this.munro.name;
    div.id = this.munro.name;
    div.classList.add('munro_box')

    const list = document.createElement('ul');
    const listItem1 = document.createElement('li');
    listItem1.textContent = `Height: ${this.munro.height}`
    list.appendChild(listItem1);

    const listItem2 = document.createElement('li');
    listItem2.textContent = `Meaning: ${this.munro.meaning}`
    list.appendChild(listItem2);

    const listItem3 = document.createElement('li');
    listItem3.innerHTML = "<a href='http://www.google.com'>Unbagged<a>";
    list.appendChild(listItem3);

    div.appendChild(list)

    this.element.appendChild(div);
}

module.exports = IndividualMunroView;
