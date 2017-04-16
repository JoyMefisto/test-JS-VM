"use strict";

$(document).ready(function () {

	try {
		run().init(numberMoneyConfiguration, VMConfiguration);
	} catch(e) {
		alert(e.message);
	}

});

function run() {
	let numberMoney, vendingMachine;

	return {

		init: function(userConfig, VMConfig) {
			this.elements(userConfig, VMConfig);
			this.events();
		},

		elements: function(userConfig, VMConfig) {
			if(!userConfig && !VMConfig) throw new Error('Configuraton is not defined');

			numberMoney = new NumberMoney(userConfig);
			vendingMachine = new VendingMachine(VMConfig);

			vendingMachine.addTableBody().upgradeTotal();
			numberMoney.renderUserMoney();
			numberMoney.renderVMMoney();
		},

		events: function() {
			let audio_give = document.getElementById("audio_give"),
				audio_product = document.getElementById("audio_product"),
				audio_add = document.getElementById("audio_add"),
				audio_reset = document.getElementById("audio_reset");


		// Закинуть деньги в кошелёк
			$('[data-money="u-add-money"]').on('click', function() {
				let num = $(this).prev().data('denomination');

				numberMoney.addUserMoney(num);
				numberMoney.renderUserMoney();

				audio_add.play();
			});

		// Закинуть деньги в автомат
			$('[data-money="u-add-vm-money"]').on('click', function() {
				let num = $(this).next().data('denomination'),
					number = numberMoney.addVMMoney(num);

				vendingMachine.info(1);
				numberMoney.renderUserMoney();
				numberMoney.renderVMMoney();

				if(!isNaN(number)) {
					vendingMachine.setTotal(number).upgradeTotal();
					audio_give.play();
				}
			});

		// Купить напиток
			$('[data-buy="product"]').on('click', function() {
				let numProduct = vendingMachine.buyProduct(this),
					elemNumProduct = $('[data-number-product='+numProduct+']').find( $('[data-count]') );

				if( numProduct > 0 ) {
					vendingMachine.upgradeTotal().setCount(numProduct, elemNumProduct);
					audio_product.play();
				}


			});

		// Вернуть сдачу
			$('#surrender').on('click', function() {
				let sum = vendingMachine.zeroingOutTotal(this);
				vendingMachine.upgradeTotal();

				if( !isNaN(sum) ) {
					numberMoney.surrender(sum);
					numberMoney.renderVMMoney();
					numberMoney.renderUserMoney();

					if(sum > 0) audio_reset.play();
				}

			});
		}
	}
};
