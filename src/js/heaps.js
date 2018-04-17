var state = {
    unique: false,
    text: "hello",
    count: 120,
    displayCountMax: 200,
    permutations: []
}

function handleChange(val){
    state.text = val

    document.getElementById('perms').innerHTML = '';

    permutationArr(state.text.split(""));

    state.count = calcPerms(state.text, state.unique);

    state.permutations.forEach( e => {
        document.getElementById("perms").innerHTML += `<div>${e}</div>`;
    })

    document.getElementById('countPhrase').innerText = countPhrase();

    let max = document.getElementById('maxMessage');
    if( state.count > state.displayCountMax ){
        max.style.display = 'flex';
        max.innerText = `First ${state.displayCountMax} permutations`;
    } else {
        max.style.display = 'none';
    }

}

function toggleState(){
    if(state.unique){
        state.unique = false;
        document.getElementById("toggle").innerText = 'UNIQUE';
    }else{
        state.unique = true;
        document.getElementById("toggle").innerText = 'ALL';
    }
    handleChange(state.text);
}

function countPhrase(){
    let str = state.count === 1 ? "permutation" : "permutations";
    return state.unique ? `${state.count} unique ${str}` : `${state.count} total ${str}`
}

function factorial(num){
    return num ? num * factorial( num - 1 ) : 1;
}

function calcPerms(string, unique){
    if(unique){
        let num = factorial(string.length);

        let count = {}

        let den =  1;

        string.split('').forEach( e => {
            if(count[e]){
                count[e]++;
            }else{
                count[e] = 1; 
            }
        })

        for( key in count ){
            den *= factorial(count[key]);
        } 

        return num / den;
    } else {
        return factorial(string.length);
    }
}

function permutationArr(arr) { 

    state.permutations = [];
  
    function swap(a, b)
    {
      var tmp = arr[a];
      arr[a] = arr[b];
      arr[b] = tmp;
    }
  
    function generate(n) { 
        if(state.permutations.length < state.displayCountMax){
            if (n === 1) {
                if( state.unique ){
                    if( state.permutations.indexOf( arr.join("") ) === -1 ){
                        state.permutations.push(arr.join("")) 
                    }
                } else {
                    state.permutations.push(arr.join(""))
                }
            } else {
                for (var i = 0; i != n; ++i) {
                generate(n - 1);
                swap(n % 2 ? 0 : i, n - 1);
                }
            }
        }
    }
  
    generate(arr.length);

  }
  
  // sets up initial conditions;
  handleChange(state.text);
