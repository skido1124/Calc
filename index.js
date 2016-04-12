var output = '', input = '';
var calc, point = false, negative = false;
var $output = $('.output');

var clear = function(){
  $output.trigger('update:output', 0);
  output = 0;
  refreshInput();
};

var numeric = function(val){
  if (input === '') {
    input = val;
  } else {
    input += String(val);
  }
  $output.trigger('update:output', input);
};

var setCalc = function(operator){
  if (input === '') {
    return;
  }

  if (!output) {
    output = input;
    refreshInput();
  } else if (input > 0 && calc && output > 0) {
    equal();
  }

  calc = operator;
};

var equal = function(){
  var input1, input2;

  if (!calc || input === '' || output === '') {
    return;
  }

  input1 = parseFloat(output);
  input2 = parseFloat(input);

  switch (calc) {
    case 'divide':
      if (input2 === 0) {
        output = 'Error';
      } else {
        output = input1 / input2;
      }
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
  calc = false;
  refreshInput();
};

var setPoint = function(){
  if (!input) {
    return;
  }

  if (!point) {
    point = true;
    input += '.';
  }
};

var percent = function(){
  if (input === '') {
    return;
  }

  input = String(parseFloat(input) / 100);
  point = true;
  $output.trigger('update:output', input);
};

var refreshInput = function(){
  input = '';
  point = false;
};

var toggleNumber = function(){
  if (!input) {
    return;
  }

  if (negative) {
    negative = false;
    input = input.substr(1);
  } else {
    negative = true;
    input = '-' + input;
  }

  $output.trigger('update:output', input);
};

var click = function(elm){
  var btn = $(elm).data('btn');

  switch (btn) {
    case 'clear':
      clear();
      break;
    case 'toggleNumber':
      toggleNumber();
      break;
    case 'percent':
      percent();
      break;
    case 'divide':
    case 'multiply':
    case 'subtract':
    case 'add':
      setCalc(btn);
      break;
    case 'point':
      setPoint();
      break;
    case 'equal':
      equal();
      break;
    default:
      numeric(btn);
      break;
  }
};

$(function(){
  $('.cell').on({
    'touchstart mousedown': function(e){
      $(this).addClass('touched');
      e.preventDefault();
    },
    'touchmove mousemove': function(e){
      e.preventDefault();
    },
    'touchend mouseup': function(){
      $(this).removeClass('touched');
      click(this);
    }
  });

  $output.on('update:output', function(e, val){
    $(this).text(val);
  });
});

console.log('success');
console.error('error!!');