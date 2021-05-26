let ajaxCalcAccess = true;
var arr_timers_form_input = [];
var arr_timers_form_textarea = [];
var submitError = false;
function createError(item) {
    create_timer(item);
    item.closest('.form-label').addClass("error");
    item.closest('.form-label').find(".form-error").fadeIn(250);
};
function create_timer(item) {
    let type = item[0].tagName;
    let index = $("form input").index(item);
    let mass = (type == 'INPUT') ? arr_timers_form_input[index] : arr_timers_form_textarea[index];
    clearTimeout(mass);
    arr_timers_form_input[index] = setTimeout(function () {
        item.parent().removeClass("error");
        item.parent().find(".form-error").fadeOut(300);
    }, 3000);
};
let regNumbers = /\d/gi;
let regNotNumbers = /\D/gi;
let regLatin = /[a-z]/gi;
let regСyrillic = /[а-яіїєґ\s]/gi;
let regNotCyrText = /[^$а-яіїєґ0-9_-\s]/gi;

let regNotCyrText2 = /[^$а-яіїєґ\s]/gi; //need

let regLatCyrText = /[^$a-zа-яіїєґ'-\s]/gi;
let regLatCyrTextNumb = /[^$a-zа-яіїєґ0-9'-\s]/gi;

let regWebsite = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;

let passwd1;
let passwd2;


$("#form-login form, #form-register form, #form-password form").submit(function (e) {
    e.preventDefault();
    var thise = $(this);
    var form = $(this);
    submitError = false;
    form.find(".error").removeClass("error");
    form.find(".form-error").remove();
    form.find("input, textarea").each(function () {
        if ($(this).val() == "" && $(this).prop('required')) {
            errorDo.call($(this), "Required")
        };


        // для почты
        if ($(this).attr("type") == "email" && $(this).prop('required')) {
            var email_val = $(this).val();
            var test_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            if(!email_val || !test_email.test(email_val)){
                if (email_val.length) {
                    errorDo.call($(this), 'Invalid email')
                } else {
                    errorDo.call($(this), "Required")
                }
            };
        };

        // name || surname
        if (($(this).attr('name') == 'name' || $(this).attr('name') == 'surname') && !$(this).val() == "") {
            // if length < 2
            if ($(this).val().length < 2) {
                errorDo.call($(this), 'At least 2 letters')
            };
            // if numbers
            if (/\d/gi.test($(this).val().replace(regNotNumbers, ''))) {
                errorDo.call($(this), 'Only letters'); // 'Тільки букви'
            }
            // if latin
            if (regLatCyrText.test($(this).val())) {
                errorDo.call($(this), 'Only cirillic and latinic');
            }
        };



        // tel
        if ($(this).attr("type") == "tel") {
            // length < 19
            if ($(this).val().length < 19) {
                errorDo.call($(this), 'Invalid'); // 'загубилась цифра'
            };
            // real tel
            let telNumbers = $(this).val().slice(10).replace(/-/gi, '');
            if (unique(telNumbers.split('')).length < 2) {
                errorDo.call($(this), 'Invalid number'); // 'Будь-ласка, введіть реальний номер телефону'
            }
        };


        if ($(this).attr("name") == "password" && $(this).prop('required')) {
            if ($(this).val() == "" && $(this).prop('required')) {
                errorDo.call($(this), "Required")
            }
            else{
                passwd1 = $(this).val();
            }
        };
        if ($(this).attr("name") == "repeat_password" && $(this).prop('required')) {
            passwd2 = $(this).val();
            if ($(this).val() == "" && $(this).prop('required')) {
                errorDo.call($(this), "Required")
            };
            if (passwd1 != passwd2) {
                errorDo.call($(this), "Incrorrect")
            }

        };



    });

    form.find("textarea").each(function () {
        if ($(this).val() == "" && $(this).prop('required')) {
            errorDo.call($(this), "Required")
        };
    });

    form.find("select").each(function () {
        if ($(this).val() == "" && $(this).prop('required')) {
            errorDo.call($(this), "Required")
        };
    });

    // agree checkbox
    let agreeInput = form.find('input[name=agree]');
    if (agreeInput.length && !agreeInput.prop('checked')) {
        errorDoAgree.call(agreeInput, 'Required');
    };

    if (!submitError) {
        let data = form.serialize();
        successForm(data, this);
        form.find("input[type='text'], input[type='tel'], input[type='email'], textarea").each(function () {
            $(this).val("");
        });
    }
    return false;
});


function errorDo(text) {
    $(this).nextAll(".form-error").remove();
    $(this).after('<span class="form-error">' + text + '</span>');
    if (!submitError) scrollToErrorInput.call($(this));
    submitError = true;
    createError($(this));
}

function errorDoAgree(text) {
    $(this).nextAll(".form-error").remove();
    $(this).next().after('<span class="form-error">' + text + '</span>');
    if (!submitError) scrollToErrorInput.call($(this));
    submitError = true;
    createError($(this));
}
function successForm(data, form) {
    //alert("success");
}

function unique(arr) {
    let result = [];
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }
    return result;
}

$(document).ready(function(){
    $(".form-confirm input[name='agree']").on('change', function () {
        const checked = $(this).prop('checked');
        const form = $(this).closest("form");
        const anotherCheckbox = form.find("input[name='agree']");
        const btn = form.find('button');
        anotherCheckbox.prop('checked', checked ? 'checked' : '');
        btn[!checked ? 'addClass' : 'removeClass']('disabled');
    })
})




