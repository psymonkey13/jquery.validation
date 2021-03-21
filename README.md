jQeury v3.2.1 + Bootstrap v4.0 Validation
===================


jQuery 기반으로 유효성을 체크하는 라이브러리입니다. Bootstrap의 Validation class를 옵션으로 사용할 수 있습니다. 

> **Note:**
> - jQuery 3.2.1, Bootstrap v4.0 기준으로 제작되었습니다.


# Quick start
#### CSS [옵션]
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```

#### jQuery [필수]
```
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
```

#### jQuery library [필수]
```
<script src="jquery-library.js"></script>
```

#### Bootstrap Javascript [옵션]
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
```

#### Sample Source
```
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <div class="form-group">
            <label class="col-form-label">필수값</label>
            <input type="text" id="req1" name="req1" class="form-control" />
        </div>
        
        <div class="form-group">
            <label class="col-form-label">필수값(feedback 위치 지정)</label>
            <input type="text" id="req2" name="req2" class="form-control" />
            <div id="feedback1" class="text-danger small"></div>
        </div>
        
        <button type="button" class="btn btn-block btn-primary">전송</button>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="jquery-library.js"></script>
    <script>
        $(document).ready(function () {
            $(':button').on('click', function () {
                var literal = {
                    req1: { selector: $('#req1'), required: { message: '필드를 입력해주세요.' } },
                    req2: { selector: $('#req2'), required: { message: '필드를 입력해주세요.', feedback: '#feedback1' } },
                    check: function() {
                        // 리터럴 함수는 반드시 수행결과에 따른 return true, false로 반환해야된다.
                        // false는 최종결과($.validate.rules)에 영향을 준다.
                        return true;
                    }
                };
                
                var result = $.validate.rules(literal, { mode: 'bootstrap' });
                console.log(result);
            });
        });
    </script>
</body>
</html>
```

# Literal
    var literal = {
        name: { // literal 항목 이름
            selector: $('#name"), // jquery 선택자
            required: { // validation 항목
                message: '이름을 입력해주세요.', // 경고 메시지
                feedback: '#feedback-position'  // 메시지 표현할 위치(옵션에 따라 무시)
            }
        },
        check: function() {
            // 리터럴 함수는 반드시 수행결과에 따른  true 또는 false로 반환해야 된다.
            // 리터럴 함수의 반환값은 최종결과($.validate.rules)에 영향을 준다.
            return true;
        }
    };
* literal 항목 이름: 중복하여 사용할 수 없으며 literal 구분값으로 사용된다.- *필수*
* selector: jquery 선택자 - *필수*
* validation 항목: - *필수*
* literal function: 사용자 정의 함수 수행 후 true 또는 flase를 반환해야 된다.  - *옵션*

# Options
    var options = { 
        mode: 'bootstrap' // alert or bootstrap
        // alert : alert 메시지로 경고 (literal 1개씩 순차적 체크 후 alert창)
        // bootstrap : bootstrap의 is-valid css 경고 (literal 전체 체크 후 경고 메시지)
    };
* mode: 'alert' or 'bootstrap' - *필수*

# $.validate.rules(literal, options);
    var literal = { ... }
    var options = { ... }
    var result = $.validate.rules(literal, options);
* true 또는 false를 반환함

# Validation
### required : 필수가 체크
    sample: { selector: $('#required'), required: { message: '필드를 입력해주세요.' } }
    입력값이 있는지 필수 항목을 체크합니다.
* message: '입력값을 입력해주세요.' - *필수*
* feedback: '#selector' - *옵션*

### digit : 숫자형 체크(정수)
    sample: { selector: $('#digit'), digit: { message: '숫자만 입력해주세요.' } }
    입력값이 숫자인지 체크합니다.
* message: '숫자만 입력해주세요.' - *필수*
* feedback: '#selector' - *옵션*

### email : 이메일 형식 체크(정규식 사용)
    sample: { selector: $('#email'), email: { message: '이메일형식을 확인해주세요.' } }
    입력값이 이메일 형식인지 체크합니다.
* message: '이메일형식을 확인해주세요.' - *필수*
* feedback: '#selector' - *옵션*

### date : 날짜 형식 체크(yyyy-MM-dd)
    sample: { selector: $('#date'), date: { message: '날짜형식을 확인해주세요.\nEx) 2018-03-08' } }
    입력값이 날짜형식인지 체크합니다. 2018-03-08 형식
* message: '날짜형식을 확인해주세요.\nEx) 2018-03-08' - *필수*
* feedback: '#selector' - *옵션*

### mobile : 휴대폰형식 체크(01012341234)
    sample: { selector: $('#mobile'), date: { message: '휴대폰번호를 확인해주세요.\nEx) 01012341234' } }
    입력값이 휴대폰형식인지 체크합니다. 01012341234 형식
* message: '휴대폰번호를 확인해주세요.\nEx) 01012341234' - *필수*
* feedback: '#selector' - *옵션*

### length :  문자열 길이 체크
    sample: { selector: $('#length'), length: { value: 2, message: '2자로 입력하세요.' } }
    입력값의 길이를 체크합니다.
* value: 2 - *필수*
* message: '2자로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### from : 숫자  크기 체크(이상)
    sample: { selector: $('#from'), from: { value: 2, message: '숫자 2이상으로 입력하세요.' } }
    입력값의 최소 값을 체크합니다.
* value: 2 - *필수*
* message: '숫자 2이상으로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### to : 숫자 크기 체크(이하)
    sample: { selector: $('#to'), to: { value: 4, message: '숫자 4이하로 입력하세요.' } }
    입력값의 최대 값을 체크합니다.
* value: 4 - *필수*
* message: '숫자 4이하로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### range : 숫자 범위 체크
    sample: { selector: $('#range'), range: { value: [2, 4], message: '숫자 2이상 4이하로 입력하세요.' } }
    입력값의 범위를 체크합니다.
* value: [2, 4] - *필수*
* message: '숫자 2이상 4이하로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### compare : 값 비교
    sample: { selector: $('#compare'), compare: { value: 'test', message: '입력한 값이 test가 아닙니다.' } }
    입력값과 비교값 일치 여부를 체크합니다.
* value: 'test' - *필수*
* message: '입력한 값이 test가 아닙니다.' - *필수*
* feedback: '#selector' - *옵션*

### regex : 정규식
    sample: { selector: $('#regex'), regex: { value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, message: '한글로 입력해주세요.' } }
    입력값이 정규식과 일치 여부를 체크합니다.
* value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ - *필수*
* message: '한글로 입력해주세요.' - *필수*
* feedback: '#selector' - *옵션*
