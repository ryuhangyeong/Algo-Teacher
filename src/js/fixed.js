var fixed = {
  event: () => {
    var element = $('#fixed');

    element.click(() => {
      swal({
        title: "다른 학습으로",
        text: "<div class='help'><div class='row'><div class='item'><a href='queue.html'><img src='img/queue.jpg' alt='queue'></a></div><div class='item'><a href='queue.html'><img src='img/queue.jpg' alt='queue'></a></div><div class='item'><a href='hashtable.html'><img src='img/hashtable.jpg' alt='hashtable'></a></div></div><div class='row'><div class='item'><a href='graph.html'><img src='img/graph.jpg' alt='graph'></a></div><div class='item'><a href='set.html'><img src='img/set.jpg' alt='queue'></a></div></div></div>",
        html: true
      });
    })
  }
}

export default fixed;
