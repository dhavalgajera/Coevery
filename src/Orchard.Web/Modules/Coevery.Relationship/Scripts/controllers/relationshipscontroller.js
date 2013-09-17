﻿'use strict';

define(['core/app/detourService'], function (detour) {
    detour.registerController([
        'RelationshipsCtrl',
        ['$rootScope', '$scope', 'logger', '$detour', '$resource', '$stateParams',
            function ($rootScope, $scope, logger, $detour, $resource, $stateParams) {
                var relationshipDataService = $resource('api/relationship/Relationship');

                var relationshipColumnDefs = [
                    { name: 'ContentId', label: 'Content Id', hidden: true },
                    {
                        name: 'Name', label: 'Relationship Name', width: 225,
                        formatter: $rootScope.cellLinkTemplate,
                        formatoptions: { useType: true }
                    },
                    { name: 'PrimaryEntity', label: 'Primary Entity', width: 220 },
                    { name: 'RelatedEntity', label: 'Related Entity', width: 220 },
                    { name: 'Type', label: 'Type', width: 225 }
                ];

                $scope.gridOptions = {
                    url: "api/relationship/Relationship?entityName=" + $stateParams.Id,
                    colModel: relationshipColumnDefs
                };

                angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);
                
                $scope.getAllRelationship = function () {
                    $("#relationList").jqGrid('setGridParam', {
                        datatype: "json"
                    }).trigger('reloadGrid');
                };

                $scope.createOneToMany = function () {
                    $detour.transitionTo('CreateOneToMany', { EntityName: $stateParams.Id });
                };
                $scope.createManyToMany = function () {
                    $detour.transitionTo('CreateManyToMany', { EntityName: $stateParams.Id });
                };
                $scope.edit = function (paramString) {
                    var params = JSON.parse(paramString);
                    if (params.type == "OneToMany") {
                        $detour.transitionTo('EditOneToMany', { EntityName: $stateParams.Id, RelationId: params.id });
                    } else if (params.type == "ManyToMany") {
                        $detour.transitionTo('EditManyToMany', { EntityName: $stateParams.Id, RelationId: params.id });
                    }
                };
                $scope.delete = function (contentId) {
                    $scope.relationshipId = contentId;
                    $('#myModalRelationship').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                };

                $scope.deleteRelationship = function () {
                    $('#myModalRelationship').modal('hide');
                    relationshipDataService.delete({ RelationshipId: $scope.relationshipId }, function () {
                        $scope.getAllRelationship();
                        logger.success("Delete the relationship successful.");
                    }, function (reason) {
                        logger.error("Failed to delete the relationship:" + reason);
                    });
                };
            }]
    ]);
});