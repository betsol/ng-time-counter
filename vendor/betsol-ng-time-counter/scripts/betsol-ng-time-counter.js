/**
 * betsol-ng-time-counter - Minimalistic time-counter for Angular.js
 * @version v1.0.0
 * @link https://github.com/betsol/ng-time-counter
 * @license MIT
 *
 * @author Slava Fomin II <s.fomin@betsol.ru>
 */
(function (angular) {

  'use strict';

  var TIME_UNITS = [
    ['seconds', 1000],
    ['minutes',   60],
    ['hours',     60],
    ['days',      24],
    ['months',    30],
    ['years',     12]
  ];

  initTimeUnits();

  angular.module('betsol.timeCounter', [])

    .directive('bsTimeCounter', function () {
      return {
        restrict: 'EAC',
        scope: {
          date: '=',
          onFinish: '&',
          interval: '@'
        },
        transclude: true,

        link: function link ($scope, $element, attrs, modelCtrl, transclude) {

          /**
           * Manually transcluding the directive's content.
           * Making sure the view is using the directive's scope instead of the original one.
           */
          transclude($scope, function (clone) {
            $element.append(clone);
          });

        },

        controller: ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {

          var diffMs;
          var countdown;
          var intervalPromise;
          var intervalMs = (parseInt($scope.interval) || 1000);

          $scope.$watch('date', syncDate);

          /**
           * Starting the counter's loop.
           */
          intervalPromise = $interval(function () {

            diffMs += intervalMs;

            if (countdown && diffMs >= 0) {
              diffMs = 0;
              $interval.cancel(intervalPromise);
              $timeout(function () {
                $scope.onFinish();
                // @todo: fire finished event
              });
            }

            render();

          }, intervalMs);

          /**
           * Cleaning up when directive is destroyed.
           */
          $scope.$on('$destroy', function () {
            // Stopping the loop implicitly when directive is destroyed.
            $interval.cancel(intervalPromise);
          });


          /**
           * Making sure our counter reflects the correct date.
           */
          function syncDate () {
            if ($scope.date instanceof Date) {
              var now = new Date();
              diffMs = now.getTime() - $scope.date.getTime();
              countdown = (diffMs < 0);
            } else {
              diffMs = 0;
              countdown = false;
            }
            render();
          }

          /**
           * Updating the view with the actual data.
           */
          function render () {
            angular.extend($scope, diffMsToTimeUnits(diffMs));
          }

        }]
      };
    })

  ;


  /**
   * Calculating absolute millisecond value for each
   * time unit.
   */
  function initTimeUnits () {
    var divider = 1;
    TIME_UNITS.forEach(function (unit) {
      divider = divider * unit[1];
      unit[1] = divider;
    });
    TIME_UNITS.reverse();
  }

  /**
   * Returns difference as separate time units.
   *
   * @param {int} diffMs
   *
   * @returns {object}
   */
  function diffMsToTimeUnits (diffMs) {
    var result = {};
    diffMs = Math.abs(diffMs);
    angular.forEach(TIME_UNITS, function (unit) {
      var name = unit[0];
      var divider = unit[1];
      var value;
      if (diffMs > 0) {
        value = Math.floor(diffMs / divider);
        diffMs -= value * divider;
      } else {
        value = 0;
      }
      result[name] = value;
    });
    result.milliseconds = diffMs;
    return result;
  }

})(angular);
