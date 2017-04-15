"use strict";

let VMConfiguration = {
    products: [
        { name: "Чай", price: 13, count: 10, number: 1},
        { name: "Кофе", price: 18, count: 20, number: 2 },
        { name: "Кофе с молоком", price: 21, count: 20, number: 3 },
        { name: "Сок", price: 35, count: 15, number: 4 }
     ],
    vm_body: "#vm_body",
    total: "#total_vm",
    total_money: 0,
    vm_info: "#vm-info"
};



function VendingMachine(config) {
    let _this = this;
    _this.data = config;

    function addTableBody() {
        let container = $('<tbody />');

        for(let product of _this.data.products) {
            container.append(
                `<tr data-number-product="${product.number}">
                    <td>${product.name}</td>
                    <td><span>${product.price}</span> руб</td>
                    <td><span data-count="${product.count}">${product.count}</span> порций</td>
                    <td>
                        <button type="button" class="btn btn-success" data-button-number="${product.number}" 
                            data-button-price="${product.price}" data-buy="product">
                            <span class="glyphicon glyphicon-shopping-cart"></span>
                        </button>
                    </td>
                </tr>`
            );
        };

        $(_this.data.vm_body).append(container);

        return this;
    };

    function upgradeTotal() {
        $(_this.data.total).text(_this.data.total_money);
        return this;
    };

    function setTotal(num) {
        _this.data.total_money += num;
        return this;
    };

    function setCount(numProduct, elem) {

        if(_this.data.products[numProduct-1].count > 0) {
            _this.data.products[numProduct-1].count -= 1;
            elem.text(_this.data.products[numProduct-1].count);
            this.info(2);
        } else {
            this.info(3);
            return false;
        }
    };

    function buyProduct(elem) {
        let button = $(elem),
            price = button.data('buttonPrice'),
            numProduct = button.data('buttonNumber');

        if(_this.data.total_money >= price) {

            if(_this.data.products[numProduct-1].count > 0) {
                _this.data.total_money -= price;

                return numProduct;
            } else {
                this.info(4);
                return false;
            }
        }
        this.info(3);
        return false;
    };

    function zeroingOutTotal() {
        let sum = _this.data.total_money;
        _this.data.total_money = 0;

        this.info(1);
        return sum;
    }

    function info(statusCode) {
        let blockInfo = $(_this.data.vm_info);
        blockInfo.removeClass('alert-success alert-info alert-warning');

        switch(statusCode) {
            case 1: blockInfo.addClass('alert-info'); blockInfo.text('Ожидание...'); break;
            case 2: blockInfo.addClass('alert-success'); blockInfo.text('Спасибо за покупку!'); break;
            case 3: blockInfo.addClass('alert-warning'); blockInfo.text('Недостаточно средств!'); break;
            case 4: blockInfo.addClass('alert-warning'); blockInfo.text('Упс! Этот напиток закончился :('); break;
            default: blockInfo.addClass('alert-info'); blockInfo.text('Ожидание...'); break;
        }
    }

    return {
        addTableBody: addTableBody,
        upgradeTotal: upgradeTotal,
        setTotal: setTotal,
        setCount: setCount,
        buyProduct: buyProduct,
        zeroingOutTotal: zeroingOutTotal,
        info: info
    }
};