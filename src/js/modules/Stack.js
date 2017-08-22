function Stack() {
  var items = [];

  this.push = function(element) {
    items.push(element);
  }

  this.pop = function() {
    return items.pop();
  }

  this.length = function() {
    return items.length;
  }
}

export default Stack;
