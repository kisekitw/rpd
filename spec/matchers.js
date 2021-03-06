;(function(global) {

    var RpdMatchers = {
        toHaveBeenOrderlyCalledWith: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    var result = { pass: false };
                    var actual_count = actual.calls.count();
                    if (expected.length > actual_count) {
                        result.message = 'Expected spy ' + actual.and.identity() +
                          ' to have been called at least ' + expected.length + ' times,' +
                          ' but it was called only ' + actual.calls.count() + ' times';
                        return result;
                    }
                    var expected_clone = [].concat(expected);
                    for (var i = 0, ei = 0; i < actual_count; i++) {
                        if (util.equals(actual.calls.argsFor(i), expected[ei], customEqualityTesters)) {
                            expected_clone.pop(); ei++;
                        }
                    }
                    if (expected_clone.length > 0) {
                        result.message = 'Expected spy ' + actual.and.identity() +
                          ' to have been called with ' + expected_clone.pop() + ', but it was not.';
                        return result;
                    }
                    result.pass = true;
                    return result;
                }
            }
        },
        toHaveBeenCalledOnce: function(util, customEqualityTesters) {
            return {
                compare: function(actual) {
                    var result = { pass: false };
                    var actual_count = actual.calls.count();
                    if (1 !== actual_count) {
                        result.message = 'Expected spy ' + actual.and.identity() +
                          ' to have been called once,' +
                          ((actual_count === 0) ? ' but it was never called'
                                                : ' but it was called ' + actual.calls.count() + ' times');
                        return result;
                    }
                    result.pass = true;
                    return result;
                }
            }
        },
        toHaveBeenCalledTwice: function(util, customEqualityTesters) {
            return {
                compare: function(actual) {
                    var result = { pass: false };
                    var actual_count = actual.calls.count();
                    if (2 !== actual_count) {
                        result.message = 'Expected spy ' + actual.and.identity() +
                          ' to have been called once,' +
                          ((actual_count === 0) ? ' but it was never called'
                                                : ' but it was called ' + actual.calls.count() + ' times');
                        return result;
                    }
                    result.pass = true;
                    return result;
                }
            }
        },
        toHaveBeenCalledTimes: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    var result = { pass: false };
                    var actual_count = actual.calls.count();
                    if (expected !== actual_count) {
                        result.message = 'Expected spy ' + actual.and.identity() +
                          ' to have been called ' + expected + ' times,' +
                          ((actual_count === 0) ? ' but it was never called'
                                                : ' but it was called ' + actual.calls.count() + ' times');
                        return result;
                    }
                    result.pass = true;
                    return result;
                }
            }
        },
        toReportError: function(util, customEqualityTesters) {
            return {
                compare: function(actual, expected) {
                    var result = { };
                    var gotError;
                    Rpd.events.onError(function(firedError) {
                        //console.log('got error', firedError);
                        gotError = firedError;
                    });
                    actual();
                    result.pass = gotError && util.equals(gotError.type, expected, customEqualityTesters);
                    result.message = 'Expected error ' + (expected || 'Unknown') + (result.pass ? ' not' : '') +
                                    ' to be fired, but ' + (gotError ? gotError.type : 'nothing') + ' was catched';
                    return result;
                }
            }
        },
        toReportAnyError: function(util, customEqualityTesters) {
            return {
                compare: function(actual) {
                    var result = { };
                    var gotError;
                    Rpd.events.onError(function(firedError) {
                        gotError = firedError;
                    });
                    actual();
                    result.pass = gotError;
                    result.message = 'Expected' + (result.pass ? ' no' : '') + ' error to be fired, but at least one'
                                    + (gotError ? (' of type ' + gotError.type) : '') + ' was' + (gotError ? '' : ' not');
                    return result;
                }
            }
        }
    };

    if (typeof define === 'function' && define.amd) {
        define([], function() { return Rpd; });
        global.RpdMatchers = RpdMatchers;
    } else if (typeof module === "object" && typeof exports === "object") {
        module.exports = RpdMatchers;
    } else {
        global.RpdMatchers = RpdMatchers;
    }

})(this);
