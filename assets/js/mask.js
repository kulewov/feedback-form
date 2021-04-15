function phoneMask(selector, mask = '') {
    let input             = selector.replace(/\./g, ''),
        regex             = /\+\d*/,
        countryCode       = '',
        countryCodeLength = '';

    document.addEventListener('input', (e) => {
        let element = e.target;
        if (element.classList.contains(input)) {
            countryCode = regex.exec(mask);
            countryCodeLength = regex.test(mask) ? countryCode[0].length : "";
            let i                        = 0,
                checkValue               = /^\D{1}/,
                digits                   = /[\d]/,
                checkMaskWithCode        = /\+\d{1,3}\s?\(\d{1,3}\)\s?\d{1,3}\D\d{1,2}\D\d{1,2}/,
                checkMask                = /\(\d{1,3}\)\s?\d{1,3}\D\d{1,2}\D\d{1,2}/,
                invalidCharsBefore       = /^([^+]+)/,
                invalidCharsAfter        = /\D\d(\s|\D)+$/,
                invalidCharsNoCodeBefore = /^([^(])/,
                maskValue                = mask.replace(/[0\D]/g, ""),

                inputValue               = element.value.replace(/\D/g, "");

            if (checkValue.test(element.value) && element.value.length === 1) {
                return element.value.replace(checkValue, "");
            }
            if (inputValue.length < maskValue.length) {
                element.value = "";
                return;
            }
            if (maskValue.length >= inputValue.length) {
                inputValue = maskValue;
            }
            if (checkMaskWithCode.test(element.value)
                || !countryCode && checkMask.test(element.value)) {
                if (invalidCharsBefore.test(element.value) && countryCode) {
                    element.value = element.value.replace(invalidCharsBefore, "");
                }
                if (invalidCharsNoCodeBefore.test(element.value) && !countryCode) {
                    element.value = element.value.replace(invalidCharsNoCodeBefore, "");
                }
                if (invalidCharsAfter.test(element.value)
                    || element.value.length > mask.length) {
                    element.value = element.value.substring(0, element.value.length - 1);
                }
                return;
            }

            element.value = mask.replace(/./g, (value) => {
                if (digits.test(value) && i < inputValue.length) {
                    return inputValue.charAt(i++);
                } else if (i >= inputValue.length) {
                    return "";
                } else {
                    return value;
                }
            });
        }
    });
    document.addEventListener('click', (e) => {
        let element = e.target;
        if (element.classList.contains(input)) {
            let position = element.selectionStart;
            if (position <= countryCodeLength) {
                element.setSelectionRange(element.value.length, element.value.length);
            }
        }
    });
    document.addEventListener('focus', (e) => {
        let element = e.target;
        if (element.classList.contains(input)) {
            if (element.value.length <= countryCodeLength) {
                element.value = countryCode ? countryCode : '';
            }
            setTimeout(() => {
                element.setSelectionRange(element.value.length, element.value.length);
            }, 10);
        }
    }, true);
    document.addEventListener('blur', (e) => {
        let element = e.target;
        if (element.classList.contains(input)) {
            if (element.value.length <= countryCodeLength) {
                element.value = "";
            }
        }
    }, true);
}