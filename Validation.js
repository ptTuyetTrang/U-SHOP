
function Validator(options) {
    function GetParent(element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element=element.parentElement
        }
    }
    var selectRules={};
// hàm thực hiện validate
    function validate(inputElement,rule){
        var errorElement = GetParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector)
        var errorMessage 

    
        // lấy ra các rulés các selector
        var rules=selectRules[rule.selector];
        //lặp qua từng rulle và kiểm tra
        // nếu có lỗi thì dừng việc kiểm tra
        for(var i=0;i<rules.length;i++){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage= rules[i](formElement.querySelector(rule.selector +':checked'));
                break;
                default:
                    errorMessage= rules[i](inputElement.value);
            }
            if(errorMessage)break;
        }

        if(errorMessage){
            errorElement.innerText=errorMessage;
            errorElement.classList.add('invalid');
        }else{
            errorElement.innerText=' ';
            errorElement.classList.remove('invalid');
        }
        return !errorMessage;
    }
// hàm lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormVlaid=true;

               //lặp qua từng rule và validate
            options.rules.forEach(function(rule){
            var inputElement=formElement.querySelector(rule.selector);
            var isValid=validate(inputElement,rule)  
            if(!isValid){
                isFormVlaid=false;
            }
            })
          //hàm onsubmit
            if(isFormVlaid){
                if(typeof options.onsubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                       switch(input.type){
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                              break;
                        case 'checkbox':
                            if(input.matches(':checked') )return values;
                            if(!Array.isArray(values[input.name])){
                                values[input.name]=[];
                            }
                            values[input.name].push(input.value)
                            break;
                        case 'file':
                            values[input.name]=input.files
                            break;
                        default:
                            values[input.name]=input.value;
                       }
                        return   values;;
                    },{});
                    options.onsubmit(formValues)
             
                }else{
                    formElement.submit();
                }
            }
        }

        options.rules.forEach(function(rule) {
            //lưu các rules mỗi input
            if(Array.isArray(selectRules[rule.selector])){
                selectRules[rule.selector].push(rule.test)
            }else{
                selectRules[rule.selector]=[rule.test]
            }
            var inputElement=formElement.querySelectorAll(rule.selector)
            Array.from(inputElement).forEach(function(inputElement){
                  //xử lý trường hợp blur ra khỏi input
                  inputElement.onblur=function(){
                    validate(inputElement,rule)  
                }
            //xử lý mỗi khi người dùng nhập input
            inputElement.oninput=function(){
                var errorElement = GetParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector)
                errorElement.innerText='';
                GetParent(inputElement,options.formGroupSelector).classList.remove('invalid');
            }
            });
        });
    }
}
Validator.isRequired=function(selector,message){
    return{
        selector:selector,
        test:function(value) {
            return value ? undefined: message ||'Vui lòng nhập họ & tên'
        }
    }
    
}
Validator.isIhone=function(selector,message){
    return{
        selector:selector,
        test:function(value) {
            var regex=/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
            return regex.test(value) ? undefined: message ||'Vui lòng nhập số điện thoại'
        }
    }
    
}
Validator.isEmail=function(selector,message){
    return{
        selector:selector,
        test:function(value){
            var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined: message ||'Email không hợp lệ'
        }
    }
    
}
Validator.isReferralCode=function(selector,message){
    return {
        selector:selector,
        test:function(value){
            if(!value){
                return undefined;
            }
            return value ? undefined: message ||'Email không hợp lệ'
        }
    }
}
Validator.Password=function(selector,message){
    return{
        selector:selector,
        test:function(value){
            var regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,20}$/;
            return regex.test(value) ? undefined :message|| `
             Mật khẩu phải thoả điều kiện sau:
                - Độ dài tối thiểu 6 ký tự
                - Có ít nhất 1 ký tự viết hoa
                - Có có ít nhất 1 chữ số
                - Có ít nhất 1 ký tự đặc biệt (vd:. #?!@$%^&*-)
            `
        }
    }
}
Validator.isConfirmed=function(selector,getCofirmValue,message){
    return {
        selector:selector,
        test:function(value){
            return value === getCofirmValue() ? undefined: message || 'Vui lòng nhập mật khẩu'
        }
    }
}

