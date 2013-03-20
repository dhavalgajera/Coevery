﻿function OpportunityDetailCtrl($scope, logger, $state, $stateParams, opportunity) {
    var id = $stateParams.opportunityId;
    var isNew = id ? false : true;

    $scope.save = function() {
        if (isNew) {
            $scope.item.$save(function(u, putResponseHeaders) {
                isNew = false;
                logger.success("Create the opportunity successful.");
            }, function() {
                logger.error("Failed to create the opportunity.");
            });
        } else {
            $scope.item.$update(function(u, putResponseHeaders) {
                logger.success("Update the opportunity successful.");
            }, function() {
                logger.error("Failed to update the opportunity.");
            });
        }
    };

    $scope.change = function() {

    };

    $scope.exit = function() {
        $state.transitionTo('opportunityList');
    };

    if (!isNew) {
        var opportunity = opportunity.get({ opportunityId: id }, function() {
            $scope.item = opportunity;
        }, function() {
            logger.error("The opportunity does not exist.");
        });
    } else {
        $scope.item = new opportunity();
    }
}