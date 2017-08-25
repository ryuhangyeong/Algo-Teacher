import palindromeData from '../data/palindromeData';
import Stack from './Stack';
import Error from '../utils/Error'; // 에러 핸들링
import Alert from '../utils/Alert'; // Materialize 알림창

// 리팩토링(17/8/24)
var Palindrome = {
  palindrome_create: $('#palindrome_create'),
  palindrome_input: $('#palindrome_input'),
  palindrome_remove: $('#palindrome_remove'),
  stack: null,
  init() {
    this.stack = new Stack();
    this.event();
    this.inputvalue();
  },

  event() {
    this.palindrome_create.click(() => {
      var text = this.palindrome_input.val();

      try {
        if(text == "") {
          throw new Error('NOT INPUT', '입력폼이 비어있습니다!');
        }
      } catch(e) {
        if(e.name == 'NOT INPUT') {
          Alert(e.message, 3000);
          return;
        }
      }
      this.isPalindrome(text)
    });
    this.palindrome_remove.click(() => {
      this.inputvalue();
    })
  },

  isPalindrome(word) {
    word = word.replace( /(\s*)/g, ""); // 모든 공백 제거
    for(var i = 0; i < word.length; i++) {
      this.stack.push(word[i]);
    }

    var rword = "";

    while(this.stack.length() > 0) {
      rword += this.stack.pop();
    }
    if(word == rword) {
      Alert('회문입니다!', 2000);
    } else {
      Alert('회문이 아닙니다!', 2000);
    }
  },

  inputvalue: function() {
    var data = palindromeData();
    this.palindrome_input.val(data);
  }
}

export default Palindrome;
