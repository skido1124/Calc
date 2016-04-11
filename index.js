var output = 0, input = 0;
var calc;
var $output = $('.output');

var clear = function(){
  $output.trigger('update:output', 0);
  input = 0;
  output = 0;
};

var numeric = function(val){
  if (!input) {
    input = val;
  } else {
    input += String(val);
  }
  $output.trigger('update:output', input);
};

var setCalc = function(operator){
  calc = operator;

  if (!output) {
    output = input;
    input = 0;
  } else if (input) {
    equal();
  }
};

var equal = function(){
  var input1, input2;

  if (!calc || !input) {
    return;
  }

  input1 = parseInt(output, 10);
  input2 = parseInt(input, 10);

  switch (calc) {
    case 'divide':
      output = input1 / input2;
      break;
    case 'subtract':
      output = input1 - input2;
      break;
    case 'multiply':
      output = input1 * input2;
      break;
    case 'add':
      output = input1 + input2;
      break;
    default:
      break;
  }

  $output.trigger('update:output', output);
  input = 0;
};

$(function(){
  $('.cell').on('click', function(){
    var btn = $(this).data('btn');

    switch (btn) {
      case 'clear':
        clear();
        break;
      case 'integer':
        break;
      case 'percent':
        break;
      case 'divide':
      case 'multiply':
      case 'subtract':
      case 'add':
        setCalc(btn);
        break;
      case 'equal':
        equal();
        break;
      default:
        numeric(btn);
        break;
    }
  });

  $output.on('update:output', function(e, val){
    $(this).text(val);
  });
});
