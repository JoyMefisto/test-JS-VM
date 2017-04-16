"use strict";

let numberMoneyConfiguration = {
// Количество монет определённого наминала для User
    money_1: 10,
    money_2: 20,
    money_5: 20,
    money_10: 15,

// Количество монет определённого наминала для VM
    vm_money_1: 10,
    vm_money_2: 30,
    vm_money_5: 20,
    vm_money_10: 15,

// Dashboard с количеством монет для User
    money_block_1: "#u-money_1",
    money_block_2: "#u-money_2",
    money_block_3: "#u-money_3",
    money_block_4: "#u-money_4",

// Dashboard с количеством монет для VM
    vm_money_block_1: "#vm-money_1",
    vm_money_block_2: "#vm-money_2",
    vm_money_block_3: "#vm-money_3",
    vm_money_block_4: "#vm-money_4",

};


function NumberMoney(config) {
    let _this = this;
    _this.data = config;


    function addUserMoney(num) {
        _this.data['money_'+num] += 1;
    };

    function renderUserMoney() {
        $(_this.data.money_block_1).html(_this.data.money_1);
        $(_this.data.money_block_2).html(_this.data.money_2);
        $(_this.data.money_block_3).html(_this.data.money_5);
        $(_this.data.money_block_4).html(_this.data.money_10);
    };

    function renderVMMoney() {
        $(_this.data.vm_money_block_1).html(_this.data.vm_money_1);
        $(_this.data.vm_money_block_2).html(_this.data.vm_money_2);
        $(_this.data.vm_money_block_3).html(_this.data.vm_money_5);
        $(_this.data.vm_money_block_4).html(_this.data.vm_money_10);
    };

    function addVMMoney(num) {
        if(_this.data['money_'+num] != 0) {
            _this.data['money_'+num] -= 1;
            _this.data['vm_money_'+num] += 1;

            return num;
        }
    };
// Сдача от VM
    function surrender(sum) {
        if(sum == 0) return false;

        let summ = sum, one, two, five, ten;

        ten = Math.floor(summ / 10);
        summ = summ % 10;
        five = Math.floor(summ / 5);
        summ = summ % 5;
        two = Math.floor(summ / 2);
        summ = summ % 2;
        one = Math.floor(summ / 1);

        _this.data.vm_money_10 -= ten;
        _this.data.vm_money_5 -= five;
        _this.data.vm_money_2 -= two;
        _this.data.vm_money_1 -= one;

        _this.data.money_10 += ten;
        _this.data.money_5 += five;
        _this.data.money_2 += two;
        _this.data.money_1 += one;
    };

    return {
        addUserMoney: addUserMoney,
        renderUserMoney: renderUserMoney,
        renderVMMoney: renderVMMoney,
        addVMMoney: addVMMoney,
        surrender: surrender
    }
};