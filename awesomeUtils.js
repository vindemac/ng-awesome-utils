angular.module("ngAwesomeUtils", [])
    /***  Orderby that takes in count the special characters *****/
    .filter("localeOrderBy", [function() {
        return function(array, sortPredicate, reverseOrder) {
            if (!Array.isArray(array)) return array;
            if (!sortPredicate) return array;

            var isString = function(value) {
                return (typeof value === "string");
            };

            var isNumber = function(value) {
                return (typeof value === "number");
            };

            var isBoolean = function(value) {
                return (typeof value === "boolean");
            };

            var arrayCopy = [];
            angular.forEach(array, function(item) {
                arrayCopy.push(item);
            });

            arrayCopy.sort(function(a, b) {
                var valueA;
                var valueB;
                if (a === Object(a)) {
                    valueA = a[sortPredicate];
                    valueB = b[sortPredicate];
                } else {
                    valueA = a;
                    valueB = b;
                }

                if (isString(valueA))
                    return !reverseOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

                if (isNumber(valueA) || isBoolean(valueA))
                    return !reverseOrder ? valueA - valueB : valueB - valueA;

                return 0;
            });

            return arrayCopy;
        }
    }])