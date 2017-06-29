(function () {
  'use strict';

  angular
    .module('ffxivCraftOptWeb.components')
    .directive('actionTable', factory);

  function factory() {
    return {
      restrict: 'E',
      templateUrl: 'components/action-table.html',
      scope: {
        cls: '=',
        onClick: '=',
        actionClasses: '=',
        selectable: '=',
        draggable: '=',
        tooltipPlacement: '@'
      },
      controller: controller
    }
  }

  function controller($scope, _actionGroups, _actionsByName, _xivdbtooltips, _getActionImagePath) {
    $scope.actionGroups = _actionGroups;
    $scope.getActionImagePath = _getActionImagePath;
    $scope.cssClassesForAction = cssClassesForAction;
    $scope.actionForName = actionForName;
    $scope.isActionCrossClass = isActionCrossClass;

    $scope.actionTooltips = {};

    $scope.$on("tooltipCacheUpdated", updateActionTooltips);
    $scope.$watch("cls", updateActionTooltips);

    updateActionTooltips();

    //////////////////////////////////////////////////////////////////////////

    function updateActionTooltips() {
      var newTooltips = {};
      angular.forEach(_actionsByName, function (action) {
        var key;
        if (action.cls != 'All') {
          key = action.cls + action.shortName;
        }
        else {
          key = $scope.cls + action.shortName;
        }
        newTooltips[action.shortName] = _xivdbtooltips.actionTooltips[key];
      });
      $scope.actionTooltips = newTooltips;
    }

    function cssClassesForAction(name) {
      var classes = $scope.actionClasses(name, $scope.cls);
      classes['selectable'] = $scope.selectable;
      return classes;
    }

    function actionForName(name) {
      return _actionsByName[name];
    }

    function isActionCrossClass(name) {
      if (!angular.isDefined(name)) {
        console.error('undefined actionName');
        return undefined;
      }
      var info = _actionsByName[name];
      if (!angular.isDefined(info)) {
        console.error('unknown action: %s', name);
        return undefined;
      }
      return info.cls != 'All' && info.cls != $scope.cls;
    }
  }
})();
