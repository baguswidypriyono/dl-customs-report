import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import ProductionOrderLampStandardCollectionReact from './production-order-lamp-standard-collection-react.jsx';


@noView()
@inject(Element)
@customElement('production-order-lamp-standard-collection')
export class ProductionOrderLampStandardCollection {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    handleItemAdd() {
        this.value.push({
            lampStandard : { toString: function () { return '' } }
        });
        this.bind();
    }

    handleItemRemove(item) {
        var itemIndex = this.value.indexOf(item);
        this.value.splice(itemIndex, 1);
        this.bind();
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        
        this.reactComponent = ReactDOM.render(
            <ProductionOrderLampStandardCollectionReact value={this.value} error={this.error} options={this.options}></ProductionOrderLampStandardCollectionReact>,
            this.element
        );
    }

    bind() {
        this.value = this.value || [];
        this.error = this.error || [];
        this.render();
    }

    unbind() {
        ReactDOM.unmountComponentAtNode(this.element);
    }

    /**
     * Data Changed
     * 
     * An automatic callback function when our "data"
     * bindable value changes. We need to rebind the React
     * element to get the new data from the ViewModel.
     * 
     * @param {any} newVal The updated data
     * @returns {void}
     * 
     */
    valueChanged(newVal) {
        this.bind();
    }
    errorChanged(newError) {
        this.bind();
    }
    filterChanged(newFilter) {
        this.bind();
    }

}
