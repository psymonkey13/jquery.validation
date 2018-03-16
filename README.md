jQeury v3.2.1 + Bootstrap v4.0 Validation
===================


jQuery 기반으로 유효성을 체크하는 라이브러리입니다. Bootstrap의 Validation class를 옵션으로 사용할 수 있습니다. 

> **Note:**
> - jQuery 3.2.1, Bootstrap v4.0 기준으로 제작되었습니다.


# Quick start
#### jQuery [필수]
```
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
```

#### jQuery library [필수]
```
<script src="jquery-library.js"></script>
```

#### Bootstrap CSS [옵션]
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
```

#### Bootstrap Javascript [옵션]
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
```

#### Sample Source
```
<script>
    function formChecker() {
        var literal = { 
            name: { selector: $('#name'), required: { message: '성명을 입력해주세요.' } },
            pwd: { selector: $('#pwd'), min: { value: 4, message: '비밀번호는 4자리 이상 입력해주세요.' } }
        };
        return $.validate.rules(literal, { mode: 'bootstrap' });
    }
</script>
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
        mode: 'bootstrap'
    };
* mode: 'alert' or 'bootstrap' - *필수*

# $.validate.rules(literal, options);
    var literal = { ... }
    var options = { ... }
    var result = $.validate.rules(literal, options);
* true 또는 false를 반환함

# Validation
### 1. required
    sample: { selector: $('#required'), required: { message: '필드를 입력해주세요.' } }
    입력값이 있는지 필수 항목을 체크합니다.
* message: '입력값을 입력해주세요.' - *필수*
* feedback: '#selector' - *옵션*

### 2. digit
    sample: { selector: $('#digit'), digit: { message: '숫자만 입력해주세요.' } }
    입력값이 숫자인지 체크합니다.
* message: '숫자만 입력해주세요.' - *필수*
* feedback: '#selector' - *옵션*

### 3. email
    sample: { selector: $('#email'), email: { message: '이메일형식을 확인해주세요.' } }
    입력값이 이메일 형식인지 체크합니다.
* message: '이메일형식을 확인해주세요.' - *필수*
* feedback: '#selector' - *옵션*

### 4. date
    sample: { selector: $('#date'), date: { message: '날짜형식을 확인해주세요.\nEx) 2018-03-08' } }
    입력값이 날짜형식인지 체크합니다. 2018-03-08 형식
* message: '날짜형식을 확인해주세요.\nEx) 2018-03-08' - *필수*
* feedback: '#selector' - *옵션*

### 5. min (길이)
    sample: { selector: $('#min'), min: { value: 2, message: '최소 2자 이상으로 입력하세요.' } }
    입력값의 최소 길이를 체크합니다.
* value: 2 - *필수*
* message: '최소 2자 이상으로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*
### 6. max (길이)
    sample: { selector: $('#max'), max: { value: 4, message: '최대 4자 이하로 입력하세요.' } }
    입력값의 최대 길이를 체크합니다.
* value: 4 - *필수*
* message: '최대 4자 이하로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### 7. from (숫자)
    sample: { selector: $('#from'), from: { value: 2, message: '숫자 2이상으로 입력하세요.' } }
    입력값의 최소 값을 체크합니다.
* value: 2 - *필수*
* message: '숫자 2이상으로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### 8. to (숫자)
    sample: { selector: $('#to'), to: { value: 4, message: '숫자 4이하로 입력하세요.' } }
    입력값의 최대 값을 체크합니다.
* value: 4 - *필수*
* message: '숫자 4이하로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### 9. range (숫자)
    sample: { selector: $('#range'), range: { value: [2, 4], message: '숫자 2이상 4이하로 입력하세요.' } }
    입력값의 범위를 체크합니다.
* value: [2, 4] - *필수*
* message: '숫자 2이상 4이하로 입력하세요.' - *필수*
* feedback: '#selector' - *옵션*

### 10. compare
    sample: { selector: $('#compare'), compare: { value: 'test', message: '입력한 값이 test가 아닙니다.' } }
    입력값과 비교값 일치 여부를 체크합니다.
* value: 'test' - *필수*
* message: '입력한 값이 test가 아닙니다.' - *필수*
* feedback: '#selector' - *옵션*

### 11. regex
    sample: { selector: $('#regex'), regex: { value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, message: '한글로 입력해주세요.' } }
    입력값이 정규식과 일치 여부를 체크합니다.
* value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ - *필수*
* message: '한글로 입력해주세요.' - *필수*
* feedback: '#selector' - *옵션*
