//  Created by psymonkey13 on 2018.03.14
//  Copyright © 2018 psymonkey13. All rights reserved.
//  jquery-library v1.0.0
// https://github.com/psymonkey13/jquery.validation.git

; (function ($) {
    'use strict';

    var defaults = {  // global default options
        mode: 'bootstrap', // alert or bootstrap
        bootstrap: {
            feedback: 'invalid-feedback',
            error: 'is-invalid',
            success: 'is-valid'
        }
    };
    var options = {}; // global options

    $.validate = {
        rules: function (literal, opts) {
            try {
                var property,
                    check = true,
                    array = [];

                options = $.extend({}, defaults, opts);

                // 리터럴 전체 each
                $.each(literal, function (key, item) {
                    if ($.type(item) === 'function') {
                        var func = item();
                        array.push({ result: func, type: 'function' });
                        if (!func && options.mode === 'alert') {
                            check = false;
                        }
                    } else if ($.type(item) === 'object') {
                        property = $.validate.property(item.selector);
                        delete item.selector;
                        $.each($.validate.validator(property, item), function (index, item) {
                            array.push(item);
                            if (!item.result && options.mode === 'alert') {
                                check = false;
                                return false; // exit each
                            }
                        });
                    } else {
                        throw 'literal ' + key + ' must be function or object.';
                    }

                    if (!check) {
                        return false; // exit each
                    }
                });

                return $.validate.feedback(array);
            } catch (e) {
                if (window.console && window.console.log) {
                    window.console.log(e);
                }
                return false;
            }
        },
        validator: function (property, literal) {
            var array = [],
                result = false;

            $.each(literal, function (key, item) {
                result = validatorResult(key, property.value, item.value);
                array.push({ result: result, type: 'object', checker: key, property: property, literal: item });
                if (!result && options.mode === 'alert') {
                    return false;
                }
            });

            return array;
        },
        property: function (selector) {
            var attribute = {},
                value;

            attribute.id = selector.attr('id');
            attribute.selector = selector;
            attribute.type = selector.attr('type');
            attribute.tag = selector[0].tagName.toLowerCase();

            // select type 속성 할당
            if (attribute.tag === 'select') {
                attribute.type = 'select';
            }

            // 값 할당
            if (attribute.type === 'radio' || attribute.type === 'checkbox') {
                var array = [];
                $(selector).each(function () {
                    if ($(this).is(':checked')) {
                        array.push($(this).val());
                    }
                    value = array.join(',');
                });
                if (value === undefined) {
                    value = '';
                }
            } else {
                value = selector.val();
            }
            attribute.value = value;

            // event 할당
            if (attribute.type === 'checkbox' || attribute.type === 'radio') {
                attribute.event = 'validate.click'
            } else if (attribute.type === 'select') {
                attribute.event = 'validate.change'
            } else {
                attribute.event = 'validate.keyup'
            }

            return attribute;
        },
        feedback: function (array) {
            var check = true;
            if (options.mode === 'bootstrap') {
                $.each(array, function (index, item) {
                    if (item.type === 'object') {
                        item.property.selector.parent().find('.' + options.bootstrap.feedback).remove();
                    }
                });
            }

            $.each(array, function (index, item) {
                if (!item.result && item.type === 'object') {
                    check = false;
                    var $selector = item.property.selector;
                    if (options.mode === 'alert') {
                        alert(item.literal.message);
                        $selector.focus();
                        return false;
                    } else if (options.mode === 'bootstrap') {
                        if (item.literal.feedback !== undefined) {
                            $(item.literal.feedback).text(item.literal.message);
                        } else {
                            if (item.property.type !== 'radio' && item.property.type !== 'checkbox') {
                                $selector.parent().append($('<div />', { addClass: options.bootstrap.feedback, text: item.literal.message }));
                            }
                        }
                        $selector.addClass(options.bootstrap.error);
                        $selector.trigger(item.property.event, [item.checker, item.literal, item.property]);
                    }
                } else if (!item.result && item.type === 'function') {
                    check = false;
                }
            });

            return check;
        },
        required: function (value) {
            if (!$.library.none(value)) {
                return true;
            }
            return false;
        },
        digit: function (value) {
            if ($.library.digit(value)) {
                return true;
            }
            return false;
        },
        length: function (value, length) {
            if (value.length === length) {
                return true;
            }
            return false;
        },
        from: function (value, length) {
            if ($.library.digit(value)) {
                if (value >= length) {
                    return true;
                }
            }
            return false;
        },
        to: function (value, length) {
            if ($.library.digit(value)) {
                if (value <= length) {
                    return true;
                }
            }
            return false;
        },
        range: function (value, array) {
            if ($.library.digit(value)) {
                if (array.length !== 2) {
                    return false;
                } else {
                    var from = array[0],
                        to = array[1];

                    if (value >= from && value <= to) {
                        return true;
                    }
                }
            }
            return false;
        },
        email: function (value) {
            var rule = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (rule.test(value)) {
                return true;
            }
            return false;
        },
        mobile: function (value) {
            var rule = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
            if (rule.test(value)) {
                return true;
            }
            return false;
        },
        compare: function (value, target) {
            if (!$.library.none(value) && !$.library.none(target)) {
                if (value === target) {
                    return true;
                }
            }
            return false;
        },
        date: function (value) {
            if ($.library.date(value)) {
                return true;
            }
            return false;
        },
        regex: function (value, express) {
            if (express.test(value)) {
                return true;
            }
            return false;
        }
    };

    $.library = {
        none: function (value) {
            if ($.trim(value) === '' || value === undefined || value === null) {
                return true;
            }
            return false;
        },
        date: function (value) {
            if (value.length === 8) {
                value = value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2);
            }

            var bits = value.split('-'),
                yyyy = bits[0],
                mm = bits[1],
                dd = bits[2],
                months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if ((!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
                months[1] = 29;
            }
            return !(/\D/.test(String(dd))) && dd > 0 && dd <= months[--mm];
        },
        in: function (array, value) {
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (value.indexOf(array[i]) !== -1) {
                    return true;
                }
            }
            return false;
        },
        pad: function (num, len) {
            num = String(num);
            return num.length >= len ? num : new Array(len - num.length + 1).join('0') + num;
        },
        digit: function (value) {
            var rule = /^[0-9]+$/;
            if (rule.test(value)) {
                return true;
            }
            return false;
        },
        browser: function () {
            var agent = navigator.userAgent.toLowerCase();
            if (agent.indexOf('chrome') !== -1) {
                return 'chrome';
            } else if (agent.indexOf('safari') !== -1) {
                return 'safari';
            } else if (agent.indexOf('firefox') !== -1) {
                return 'firefox';
            } else if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.indexOf('msie') !== -1)) {
                return 'ie';
            }
        },
        device: function () {
            var agent = navigator.userAgent.toLowerCase();
            var items = ['iphone', 'ipod', 'ipad', 'android'];
            var result = undefined;

            $.each(items, function (i, item) {
                if (agent.indexOf('iphone') !== -1 || agent.indexOf('ipod') !== -1 || agent.indexOf('ipad') !== -1) {
                    result = 'ios';
                    return false;
                } else if (agent.indexOf('android') !== -1) {
                    result = 'android';
                    return false;
                }
            });
            return result;
        },
        comma: function (str) {
            str = String(str);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        },
        popup: function (url, name, width, height) {
            var x = (screen.availWidth - width) / 2
                , y = (screen.availHeight - height) / 2;
            window.open(url, name, 'width=' + width + ', height=' + height + ', left=' + x + ', top=' + y + ', scrollbars=yes, toolbar=no, menubar=no, location=no, resizable=no');
        }
    };

    $.sns = {
        facebook: function (url) {
            url = encodeURIComponent(url);
            window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
        },
        twitter: function (url) {
            url = encodeURIComponent(url);
            window.open('http://twitter.com/intent/tweet?url=' + url);
        },
        kakaostory: function (url) {
            url = encodeURIComponent(url);
            window.open('https://story.kakao.com/share?url=' + url);
        },
        naver: function (msg, url) {
            url = encodeURI(encodeURIComponent(url));
            msg = encodeURI(msg);
            window.open('https://share.naver.com/web/shareView.nhn?url=' + url + '&title=' + msg);
        }
    };

    // 유효성 검사항목을 찾고 결과 반환 -custom 이벤트에서만 사용!
    function validatorResult(checker, value1, value2) {
        var result = false
        if ($.library.in(['required', 'digit', 'email', 'date', 'mobile'], checker)) {
            result = $.validate[checker](value1);
        } else {
            if (value2 !== undefined) {
                result = $.validate[checker](value1, value2);
            }
        }

        return result;
    }

    // Bootstrap 유효성검사 Toggle
    function validatorToggle(result, selector, literal) {
        if (result) {
            selector.removeClass(options.bootstrap.error);
            selector.addClass(options.bootstrap.success);
        } else {
            selector.removeClass(options.bootstrap.success);
            selector.addClass(options.bootstrap.error);
        }

        if (literal.feedback !== undefined) {
            if (!result) {
                $(literal.feedback).text(literal.message);
            } else {
                $(literal.feedback).text('');
            }
        }
    }

    // validate event 키보드 이벤트
    $(document).on('validate.keyup', function (e, checker, literal, property) {
        property.selector.off().on('keyup', function (event) {
            var result = validatorResult(checker, $(this).val(), literal.value);
            validatorToggle(result, property.selector, literal);
        });
    });

    // validate event 클릭 이벤트
    $(document).on('validate.click', function (e, checker, literal, property) {
        property.selector.off().on('click', function () {
            var result = false;
            property.selector.each(function () {
                if ($(this).is(':checked')) {
                    result = true;
                    return false; // each
                }
            });

            validatorToggle(result, property.selector, literal);
        });
    });

    // validate event 변경 이벤트
    $(document).on('validate.change', function (e, checker, literal, property) {
        property.selector.off().on('change', function () {
            var result = !$.library.none($(this).val()) ? true : false;
            validatorToggle(result, property.selector, literal);
        });
    });
}(jQuery));