import Stack from './Stack';
import palindromeData from '../data/palindromeData';

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

      if(text == "") {
        Materialize.toast('입력폼이 비어있습니다!', 2000, 'rounded')
        return;
      }
      this.isPalindrome(text)
    });

    this.palindrome_remove.click(() => {
      this.inputvalue();
    })
  },

  isPalindrome(word) {
    word = word.replace( /(\s*)/g, "");
    for(var i = 0; i < word.length; i++) {
      this.stack.push(word[i]);
    }

    var rword = "";

    while(this.stack.length() > 0) {
      rword += this.stack.pop();
    }
    if(word == rword) {
      Materialize.toast('회문입니다!', 2000, 'rounded')
    } else {
      Materialize.toast('회문이 아닙니다!', 2000, 'rounded')
    }
  },

  inputvalue: function() {
    var data = palindromeData();

    this.palindrome_input.val(data);
  }
}

export default Palindrome;
