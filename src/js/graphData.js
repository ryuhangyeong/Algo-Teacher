function matrix() {
  var list = [
    {
      text: `0 1 0 0 0
1 0 1 1 1
0 1 0 1 0
0 1 1 0 1
0 1 0 1 0`
    },
    {
      text: `0 1 0 0 1
1 0 1 1 1
0 1 0 1 1
0 1 1 0 1
1 1 1 1 0`
    },
    {
      text: `0 1 1 1 1
1 0 1 1 1
1 1 0 1 1
1 1 1 0 1
1 1 1 1 0`
    },
    {
      text: `0 1 0 0 0 1
1 0 0 1 1 1
0 0 0 1 0 1
0 1 1 0 1 1
0 1 0 1 0 1
1 1 1 1 1 0`
    },
    {
      text: `0 1 0 0 0 0
1 0 0 1 1 0
0 0 0 1 0 0
0 1 1 0 1 0
0 1 0 1 0 1
0 0 0 0 1 0`
    },
    {
      text: `0 1 0 0 0 1
1 0 0 1 1 0
0 0 0 1 0 1
0 1 1 0 1 0
0 1 0 1 0 1
1 0 1 0 1 0`
    }
  ];

  var random = Math.floor(Math.random() * (list.length));
  return list[random].text;
}

function adjacency() {
  var list = [
    {
      text: `2
1345
24
23
2`,
      length: 5
    },
    {
      text: `235
1345
241
23
21`,
      length: 5
    },
    {
      text: `2
135
24
3
2`,
      length: 5
    },
    {
      text: `25
1345
24
235
241`,
      length: 5
    },
    {
      text: `2534
1345
241
2351
241`,
      length: 5
    },
    {
      text: `23
13
12`,
      length: 3
    },
    {
      text: `23
14
14
23`,
      length: 4
    },
    {
      text: `24
13
24
13`,
      length: 4
    },
    {
      text: `243
134
241
132`,
      length: 4
    }
  ];

  var random = Math.floor(Math.random() * (list.length));
  return {
    'text': list[random].text.replace(/(^\s*)|(\s*$)/gi, ""),
    'length': list[random].length
  }


}

export {
  matrix,
  adjacency
}
