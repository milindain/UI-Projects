(function() {
    angular.module('myApp', []);

    angular.module('myApp').controller('MainController', function($scope) {
        $scope.user1 = {
            name: 'Milind Patil',
            address: {
                street: 'PO Box 123',
                city: 'Secret Rebel Base',
                planet: 'Yavin 4'
            },
            friends: [
                'Han',
                'Leia',
                'Chewbacca'
            ],
            level: 0
        }

        $scope.user2 = {
            name: 'Nandu Patil',
            address: {
                street: 'PO Box 123',
                city: 'Mos Eisley',
                planet: 'Tattoine'
            },
            friends: [
                'Han',
                'Leia',
                'Chewbacca'
            ],
            level: 1
        }
    });

    angular.module('myApp').directive('stateDisplay', function() {
        return {
            link: function(scope, el, attrs) {
                scope.$watch(attrs['stateDisplay'], function(newVal) {
                    switch (newVal) {
                        case 0:
                            el.css('background-color', 'white');
                            break;
                        case 1:
                            el.css('background-color', 'yellow');
                            break;
                        case 2:
                            el.css('background-color', 'red');
                            break;
                    }
                });
            }
        }
    })

    angular.module('myApp').directive('userInfoCard', function() {
        return {
            templateUrl: "userInfoCard.html",
            restrict: "E",
            scope: {
                user: '=person',
                initialcollapsed: '@collapsed'
            },
            controller: function($scope) {
                $scope.collapsed = ($scope.initialcollapsed === 'true');
                $scope.nextState = function() {
                    $scope.user.level++;
                    $scope.user.level = $scope.user.level % 3;
                }
                $scope.knightMe = function(user) {
                    user.rank = "Knight";
                }
                $scope.collapse = function() {
                    $scope.collapsed = !$scope.collapsed;
                }
                $scope.removeFriend = function(friend) {
                    var idx = $scope.user.friends.indexOf(friend);
                    if (idx > -1) {
                        $scope.user.friends.splice(idx, 1);
                    }
                }
            }
        }
    });

    angular.module('myApp').directive('removeFriend', function() {
        return {
            restrict: 'E',
            templateUrl: 'removeFriend.html',
            scope: {
                notifyParent: '&method'
            },
            controller: function($scope) {
                $scope.removing = false;
                $scope.startRemove = function() {
                    $scope.removing = true;
                }
                $scope.cancelRemove = function() {
                    $scope.removing = false;
                }
                $scope.confirmRemove = function() {
                    $scope.notifyParent();
                }
            }
        }
    });

    angular.module('myApp').directive('address', function() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'userAddress.html',
            controller: function($scope) {
                $scope.collapsed = false;
                $scope.collapseAddress = function() {
                    $scope.collapsed = true;
                }
                $scope.expandAddress = function() {
                    $scope.collapsed = false;
                }
            }
        }
    });

}());
