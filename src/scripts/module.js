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
          direction: '=',
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

        controller: function ($scope, $interval, $timeout) {

          var diffMs;
          var countingDown;
          var intervalPromise;
          var intervalMs = (parseInt($scope.interval) || 1000);


          // Cleaning up when directive is destroyed.
          $scope.$on('$destroy', function () {
            // Stopping the loop implicitly when directive is destroyed.
            clearCounter();
          });

          $scope.$watch('date', onWatchedPropertyChanged);
          $scope.$watch('direction', onWatchedPropertyChanged);

          // Syncing properties initially.
          syncProperties();


          function onWatchedPropertyChanged (newValue, oldValue) {
            if (newValue !== oldValue) {
              syncProperties();
            }
          }

          /**
           * Making sure our counter reflects the correct date.
           */
          function syncProperties () {

            // Setting new value for direction.
            switch ($scope.direction) {
              case 'up':
                countingDown = false;
                break;
              case 'down':
                countingDown = true;
                break;
              default:
                countingDown = undefined;
                break;
            }

            // Updating internal time difference.
            if ($scope.date instanceof Date) {

              // Calculating difference between current date and target date.
              var now = new Date();
              diffMs = (now.getTime() - $scope.date.getTime());

              // Auto-detecting direction if not set explicitly.
              if ('undefined' === typeof countingDown) {
                countingDown = (diffMs < 0);
              }

            } else {
              // Setting difference to zero if date is not provided.
              diffMs = 0;
            }

            // Making sure difference is adjusted correctly if timer should be stopped.
            if (isCounterShouldBeStopped()) {
              diffMs = 0;
            }

            // Updating the view with new value.
            render();

            // Making sure counter is ticking.
            if (!isCounterShouldBeStopped()) {
              startCounter();
            }

          }

          /**
           * Updating the view with the actual data.
           */
          function render () {
            var valueToRender = diffMs;
            if (false === countingDown && diffMs < 0) {
              // Rendering counter as zero when counting up and
              // target date is in the future.
              valueToRender = 0;
            }
            angular.extend($scope, diffMsToTimeUnits(valueToRender));
          }

          /**
           * Starts or re-starts the counter loop.
           */
          function startCounter () {
            if (intervalPromise) {
              clearCounter();
            }
            intervalPromise = $interval(counterTick, intervalMs);
          }

          /**
           * Stops the counter loop.
           */
          function clearCounter () {
            $interval.cancel(intervalPromise);
            intervalPromise = null;
          }

          /**
           * Counter tick handler.
           */
          function counterTick () {

            // Updating internal difference value.
            diffMs += intervalMs;

            // Checking if counter should be stopped.
            if (isCounterShouldBeStopped()) {
              diffMs = 0;
              clearCounter();
              $timeout(function () {
                $scope.onFinish();
                // @todo: fire finished event
              });
            }

            // Updating the view.
            render();

          }

          /**
           * Indicates if counter should be stopped.
           *
           * @returns {boolean}
           */
          function isCounterShouldBeStopped () {
            // No need to run counter when counting down and
            // target date is already reached.
            return (countingDown && diffMs >= 0);
          }

        }
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
