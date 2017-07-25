class Queue {
  constructor() {
    this.queue_create = $('.queue_create');
    this.queue_remove = $('.queue_remove');
    this.queue_input = $('.queue_input');
    this.list = $('.queue_list');
    this.text = $('.queue_text');
    this.data = [];
    this.enqueue(100);
    this.rendering();
    this.randomInput();
  }

  enqueue(value) {
    this.data.push(value);
  }

  dequeue() {
    return this.data.shift();
  }

  count() {
    return this.data.length;
  }

  randomInput() {
    var random = Math.floor(Math.random() * 99);
    this.queue_input.val(random);
  }

  event() {
    this.queue_create.click(() => {
      this.queue_create.attr('disabled', true);
      if(this.count() > 8) {
        swal({
          type: "warning",
          title: "더 이상 추가할 수 없어요!",
          timer: 1000,
          showConfirmButton: false
        });
        this.clickprevent(this.queue_create, false);
        return;
      }

      this.clickprevent(this.queue_create, false);

      this.text.css({
        'left': '1200px',
        'font-size': '50px',
        'background-color': '#4B9BE1',
        'color': '#fff'
      });

      this.text.animate({
        'left': '1200px',
        'opacity': '1'
      });

      this.text.html($('.queue_input').val())

      setTimeout(() => {
        this.enqueue($('.queue_input').val());
        this.rendering();
        $('.queue_input').val("");
        this.randomInput();
        this.text.html("");
      }, 1000);

      this.text.animate({
        'left': '500px',
        'opacity': '0'
      });

    })

    this.queue_remove.click(() => {

      if(this.count() == 1) {
        swal({
          type: "warning",
          title: "더 이상 삭제할 수 없어요!",
          timer: 1000,
          showConfirmButton: false
        });
        this.clickprevent(this.queue_remove, false);
        return;
      }
      var front = $('.movebox').eq(0);
      this.queue_remove.attr('disabled', true);

      front.css({
        'background-color': '#DC143C',
        'opacity': '1'
      });

      front.animate({
        'left': '-100px',
        'opacity': '0'
      })
      // console.log(front);



      this.clickprevent(this.queue_remove, false);

      setTimeout(() => {
        this.dequeue();
        this.rendering();
      }, 500);
    })
  }

  clickprevent(selector, boolean) {
    setTimeout(() => {
      selector.attr('disabled', boolean);
    }, 1000);
  }

  rendering() {
    this.list.html('');
    this.data.forEach((item, index) => {
      this.list.append('<span class=movebox>'+item+'</span>');
    });
  }
}

export default Queue;
