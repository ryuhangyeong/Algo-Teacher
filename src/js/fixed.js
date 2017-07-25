var fixed = {
  event: () => {
    var element = $('#fixed');

    element.click(() => {
      swal({
        title: "다른 학습으로",
        text: "<div class='help'><div class='row'><div class='item'><a href='queue.html'><img src='img/queue.jpg' alt='queue'></a></div><div class='item'><a href='queue.html'><img src='img/queue.jpg' alt='queue'></a></div><div class='item'><a href='queue.html'><img src='img/queue.jpg' alt='queue'></a></div></div></div>",
        html: true
      });
    })
  }
}

export default fixed;
