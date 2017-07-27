function matrix() {
  var list = [
    {
      text: `0 1 0 0 0
1 0 1 1 1
0 1 0 1 0
0 1 1 0 1
0 1 0 1 0
      `
    },
    {
      text: `0 1 0 0 1
1 0 1 1 1
0 1 0 1 1
0 1 1 0 1
1 1 1 1 0
      `
    },
    {
      text: `0 1 1 1 1
1 0 1 1 1
1 1 0 1 1
1 1 1 0 1
1 1 1 1 0
      `
    },
    {
      text: `0 1 0 0 0 1
1 0 0 1 1 1
0 0 0 1 0 1
0 1 1 0 1 1
0 1 0 1 0 1
1 1 1 1 1 0
      `
    },
    {
      text: `0 1 0 0 0 0
1 0 0 1 1 0
0 0 0 1 0 0
0 1 1 0 1 0
0 1 0 1 0 1
0 0 0 0 1 0
      `
    },
    {
      text: `0 1 0 0 0 1
1 0 0 1 1 0
0 0 0 1 0 1
0 1 1 0 1 0
0 1 0 1 0 1
1 0 1 0 1 0
      `
    }
  ];

  var random = Math.floor(Math.random() * (list.length));
  return list[random].text;
}

function adjacency() {
  var list = [
    {
      text: `2/
1345/
24/
23/
2
      `
    },
    {
      text: `235/
1345/
241/
23/
21
      `
    },
    {
      text: `2/
135/
24/
3/
2
      `
    },
    {
      text: `25/
1345/
24/
235/
241
      `
    },
    {
      text: `2534/
1345/
241/
2351/
241

      `
    },
    {
      text: `23/
13/
12
      `
    },
    {
      text: `23/
14/
14/
23
      `
    },
    {
      text: `24/
13/
24/
13
      `
    },
    {
      text: `243/
134/
241/
132
      `
    }
  ];

  var random = Math.floor(Math.random() * (list.length));
  return list[random].text;
}

export {
  matrix,
  adjacency
}
