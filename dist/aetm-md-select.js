(function () {
    'use strict';

    var templateDirective = [
    '<div class="aetm-md-select" ng-click="$ctrl.openPopup()">',
        '<label class="aetm-md-select-title">{{ $ctrl.selectTitle }}</label>',
        '<div class="aetm-md-select-value">',
            '<span ng-if="$ctrl.currentValue">{{ $ctrl.currentValue.name }}</span>',
            '<em ng-if="!$ctrl.currentValue">{{ $ctrl.selectPlaceholder }}</em>',
        '</div>',
    '</div>'].join('');

    var templatePopup = [
    '<div class="list">',
        '<ion-radio ng-repeat="value in data.values" ng-model="$parent.data.selected" ng-value="value.id">{{ value.name }}</ion-radio>',
    '</div>'].join('');

    angular
    .module('aetm-md-select', [])
    .component('aetmMdSelect', {
        bindings: {
            selectTitle: '@',
            selectPlaceholder: '@',
            selectValues: '<',
            ngModel: '='
        },
        template: templateDirective,
        controller: ['$ionicPopup', '$scope', function ($ionicPopup, $scope) {
            var vm = this;

            if (vm.selectValues.length < 1) {
                throw "Value array missing. You should specify a value list with the 'select-value' attribute.";
            }

            // watch ng-model to display selected value
            vm.currentValue = null;
            $scope.$watch(function () {
                return vm.ngModel;
            }, function (newValue) {
                var i,
                    len = vm.selectValues.length,
                    value;

                if (newValue === undefined) {
                    vm.currentValue = undefined;
                    return;
                }

                for (i = 0; i < len; i += 1) {
                    value = vm.selectValues[i];

                    if (value.id === newValue) {
                        vm.currentValue = value;
                        return;
                    }
                }
            });

            // bind component values to popup scope
            $scope.data = {
                selected: vm.ngModel,
                values: vm.selectValues
            };

            vm.openPopup = function () {
                // reset selected value
                $scope.data.selected = vm.ngModel;

                $ionicPopup.show({
                    title: vm.selectTitle,
                    template: templatePopup,
                    scope: $scope,
                    cssClass: 'aetm-md-select-popup',
                    buttons: [
                        {
                            text: 'ANNULER',
                            type: 'button-balanced'
                        },
                        {
                            text: 'OK',
                            type: 'button-balanced',
                            onTap: function () {
                                return $scope.data.selected;
                            }
                        }
                    ]
                }).then(function (selected) {
                    if (selected) {
                        vm.ngModel = selected;
                    }
                });
            };
        }]
    });
})();